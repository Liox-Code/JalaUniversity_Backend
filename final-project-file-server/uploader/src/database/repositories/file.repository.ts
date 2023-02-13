import { AppDataSource, client, DATABASE_NAME } from '../dataSource'
import { IFileRepository } from '../../types/IFile.type'
import { EntityManager, FindManyOptions, Repository } from 'typeorm'
import { FileMapper } from '../../mappers/file.mapper'
import { FileDTO } from '../../dto/file.dto'
import { FileEntity } from '../entities/file.entity'
import { Readable } from 'stream'
import { GridFSBucket, ObjectId } from 'mongodb'

export class FileRepository implements IFileRepository {
  private readonly repository: Repository<FileEntity>
  private readonly manager: EntityManager

  constructor () {
    this.repository = AppDataSource.getMongoRepository(FileEntity)
    this.manager = AppDataSource.manager
  }

  createFile = async (file: FileDTO) => {
    const createFile = await this.repository.save(FileMapper.toEntity(file))
    return FileMapper.toDTO(createFile)
  }

  readFile = async (fileId: string) => {
    const foundFile = await this.repository.findOneBy({ _id: fileId })

    if (!foundFile) {
      throw new Error(`File with id ${fileId} not found`)
    }

    return FileMapper.toDTO(foundFile)
  }

  updateFile = async (file: FileDTO) => {
    const { fileId } = file
    const updatedFile = await this.repository.update({ _id: fileId }, FileMapper.toEntity(file))

    const didMatch = updatedFile.raw.matchedCount > 0

    if (!didMatch) {
      throw new Error(`File ${fileId}, matchedCount equal to 0`)
    }

    return didMatch
  }

  deleteFile = async (fileId: string) => {
    const options: FindManyOptions<FileEntity> = {
      where: { _id: fileId }
    }
    const file = await this.repository.find(options)
    const removeResponse = await this.repository.remove(file)
    return (removeResponse.length > 0)
  }

  saveFile = async (fileId: string, status: string, file: Express.Multer.File): Promise<FileDTO> => {
    const { originalname, mimetype, buffer, size } = file

    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' }
    })

    const uploadStream = gridFSBucket.openUploadStream(originalname, {
      contentType: mimetype
    })

    const promise = new Promise<FileEntity>((resolve, reject) => {
      const bufferStream = new Readable()
      bufferStream.push(buffer)
      bufferStream.push(null)
      bufferStream.pipe(uploadStream)
        .on('error', reject)
        .on('finish', () => {
          resolve(
            this.manager.save(
              this.manager.create(FileEntity, {
                _id: fileId,
                fileName: originalname,
                size: size.toString(),
                status
              })
            )
          )
        })
    })
    const response = FileMapper.toDTO(await promise)
    return response
  }

  getFile = async (fileId: string) => {
    const id = ObjectId('63e9fa95bb7ff26fcda37761')
    console.log(id)
    console.log(ObjectId('63e9fa95bb7ff26fcda37761'))
    console.log(ObjectId('63e9fa95bb7ff26fcda37762'))
    // console.log(id)
    // console.log(ObjectId('63e9ef557540dd6c0bf8a99e'))
    // console.log(ObjectId('63e9ef557540dd6c0bf8a99f'))
    const foundFile = await this.manager.findOneBy(FileEntity, { _id: id })
    if (!foundFile) {
      throw new Error('File not found')
    }

    const gridFSBucket = new GridFSBucket(client.db(DATABASE_NAME), {
      chunkSizeBytes: 1024,
      bucketName: 'fs',
      writeConcern: { w: 'majority' }
    })

    const readStream = gridFSBucket.openDownloadStream(foundFile)

    return readStream
  }
}
