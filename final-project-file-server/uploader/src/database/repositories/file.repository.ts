import { AppDataSource, client, DATABASE_NAME } from '../dataSource'
import { IFileRepository } from '../../types/IFile.type'
import { EntityManager, Repository } from 'typeorm'
import { FileMapper } from '../../mappers/file.mapper'
import { FileDTO } from '../../dto/file.dto'
import { FileEntity } from '../entities/file.entity'
import { Readable } from 'stream'
import { GridFSBucket, ObjectId, ReadPreference } from 'mongodb'
import { HttpError } from '../../middlewares/errorHandler'

export class FileRepository implements IFileRepository {
  private readonly repository: Repository<FileEntity>
  private readonly manager: EntityManager

  constructor () {
    this.repository = AppDataSource.getMongoRepository(FileEntity)
    this.manager = AppDataSource.manager
  }

  createFile = async (file: Express.Multer.File): Promise<FileDTO> => {
    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' }
    })

    const readableStream = new Readable()
    readableStream.push(file.buffer)
    readableStream.push(null)

    const uploadStream = gridFSBucket.openUploadStream(file.originalname)
    const fileId = uploadStream.id

    const fileEntity = new FileEntity()
    fileEntity.fileId = fileId
    fileEntity.fileName = file.originalname
    fileEntity.mimeType = file.mimetype
    fileEntity.size = file.size
    fileEntity.status = 'started'

    await this.repository.save(fileEntity)

    const finished = new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve)
      uploadStream.on('error', reject)
    })

    readableStream.pipe(uploadStream)

    await finished

    const downloadStream = gridFSBucket.openDownloadStream(fileId)
    const buffer = await this.streamToBuffer(downloadStream)

    return FileMapper.toDTO(fileEntity, buffer)
  }

  readFiles = async () => {
    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' },
      readPreference: ReadPreference.primary
    })

    const files = await this.manager.find(FileEntity)

    const fileDTOs: FileDTO[] = []

    for (const file of files) {
      if (!file.fileId) throw new HttpError(400, `file ID ${file.fileId} is undefined`)
      const downloadStream = gridFSBucket.openDownloadStream(file.fileId)
      const buffer = await this.streamToBuffer(downloadStream)
      fileDTOs.push(FileMapper.toDTO(file, buffer))
    }
    return fileDTOs
  }

  readFileById = async (id: string): Promise<FileDTO> => {
    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' },
      readPreference: ReadPreference.primary
    })

    const file = await this.repository.findOne({ where: { _id: new ObjectId(id) } })
    if (!file) {
      throw new HttpError(400, 'File not found')
    }

    if (!file.fileId) throw new HttpError(400, `file ID ${file.fileId} is undefined`)
    const downloadStream = gridFSBucket.openDownloadStream(file.fileId)
    const buffer = await this.streamToBuffer(downloadStream)
    return FileMapper.toDTO(file, buffer)
  }

  updateFile = async (fileDTO: FileDTO, file: Express.Multer.File) => {
    if (!fileDTO) throw new HttpError(500, 'file not found')

    const fileEntity = await FileMapper.toEntity(fileDTO)
    const { id, fileId } = fileEntity

    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' }
    })

    const fileExists = await gridFSBucket.find({ _id: fileId }).toArray()
    if (!fileExists.length) throw new HttpError(500, 'file not found on MongoGrid FS')

    await gridFSBucket.delete(fileId)

    const readableStream = new Readable()
    readableStream.push(file.buffer)
    readableStream.push(null)

    const uploadStream = gridFSBucket.openUploadStreamWithId(new ObjectId(fileId), file.originalname)

    fileEntity.fileId = new ObjectId(fileId)
    fileEntity.fileName = file.originalname
    fileEntity.mimeType = file.mimetype
    fileEntity.size = file.size
    fileEntity.status = 'Saving Changes'

    await this.repository.save(fileEntity)

    const finished = new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve)
      uploadStream.on('error', reject)
    })

    readableStream.pipe(uploadStream)

    await finished

    const downloadStream = gridFSBucket.openDownloadStream(new ObjectId(fileId))
    const buffer = await this.streamToBuffer(downloadStream)

    return FileMapper.toDTO(fileEntity, buffer)
  }

  updateFileStatus = async (fileId: string, status: string) => {
    if (!fileId) throw new HttpError(500, 'file id not provided')

    const parsedId: ObjectId = new ObjectId(fileId)
    const updatedFile = await this.repository.update({ _id: parsedId }, { status })

    const didMatch = updatedFile.raw.matchedCount > 0

    if (!didMatch) {
      throw new HttpError(500, `file id:${fileId}, matchedCount equal to 0`)
    }

    return didMatch
  }

  deleteFile = async (fileDTO: FileDTO) => {
    if (!fileDTO) throw new HttpError(500, 'file not found')

    const file = await FileMapper.toEntity(fileDTO)
    const { id, fileId } = file

    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' }
    })

    const fileExists = await gridFSBucket.find({ _id: fileId }).toArray()
    if (!fileExists.length) throw new HttpError(500, 'file not found on MongoGrid FS')

    const removedFile = await this.repository.remove(file)

    await gridFSBucket.delete(fileId)

    return (removedFile)
  }

  streamToBuffer = async (stream: Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: any[] = []
      stream.on('data', (chunk) => {
        chunks.push(chunk)
      })
      stream.on('error', reject)
      stream.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })
  }
}
