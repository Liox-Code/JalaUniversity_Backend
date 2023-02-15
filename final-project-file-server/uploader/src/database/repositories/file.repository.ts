import { AppDataSource, client, DATABASE_NAME } from '../dataSource'
import { IFileRepository } from '../../types/IFile.type'
import { EntityManager, Repository } from 'typeorm'
import { FileMapper } from '../../mappers/file.mapper'
import { FileDTO } from '../../dto/file.dto'
import { FileEntity } from '../entities/file.entity'
import { Readable } from 'stream'
import { GridFSBucket, ObjectId, ReadPreference } from 'mongodb'

export class FileRepository implements IFileRepository {
  private readonly repository: Repository<FileEntity>
  private readonly manager: EntityManager

  constructor () {
    this.repository = AppDataSource.getMongoRepository(FileEntity)
    this.manager = AppDataSource.manager
  }

  createFile = async (file: Express.Multer.File): Promise<FileDTO> => {
    const status = 'status'

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
    fileEntity._id = fileId
    fileEntity.fileName = file.originalname
    fileEntity.mimeType = file.mimetype
    fileEntity.size = file.size
    fileEntity.status = status

    await this.manager.save(fileEntity)

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
      if (!file._id) throw new Error(`file ID ${file._id} is undefined`)
      const downloadStream = gridFSBucket.openDownloadStream(file._id)
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

    const file = await this.manager.findOne(FileEntity, { where: { _id: new ObjectId(id) } })
    if (!file) {
      throw new Error('File not found')
    }

    if (!file._id) throw new Error(`file ID ${file._id} is undefined`)
    const downloadStream = gridFSBucket.openDownloadStream(file._id)
    const buffer = await this.streamToBuffer(downloadStream)
    return FileMapper.toDTO(file, buffer)
  }

  updateFile = async (fileId: string, file: Express.Multer.File) => {
    const status = 'status'

    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' }
    })

    const fileExists = await gridFSBucket.find({ _id: new ObjectId(fileId) }).toArray()
    if (fileExists.length) {
      await gridFSBucket.delete(new ObjectId(fileId))
    }

    const readableStream = new Readable()
    readableStream.push(file.buffer)
    readableStream.push(null)

    const uploadStream = gridFSBucket.openUploadStreamWithId(new ObjectId(fileId), file.originalname)

    await this.manager.update(FileEntity, { where: { _id: new ObjectId(fileId) } }, {
      fileName: file.originalname,
      status,
      mimeType: file.mimetype,
      size: file.size
    })

    const finished = new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve)
      uploadStream.on('error', reject)
    })

    readableStream.pipe(uploadStream)

    await finished

    const downloadStream = gridFSBucket.openDownloadStream(new ObjectId(fileId))
    const buffer = await this.streamToBuffer(downloadStream)

    return FileMapper.toDTO({
      fileName: file.originalname,
      status,
      mimeType: file.mimetype,
      size: file.size
    }, buffer)
  }

  deleteFile = async (fileId: string) => {
    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' }
    })

    const removedFile = await this.manager.delete(FileEntity, fileId)

    const removedGridFile = await gridFSBucket.delete(new ObjectId(fileId))

    console.log(`removedFile: ${removedFile}, removedGridFile: ${removedGridFile}`)

    return true
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
