import { AppDataSource } from '../dataSource'
import { IFileRepository } from '../../types/IFile.repository'
import { FindManyOptions, Repository } from 'typeorm'
import { FileMapper } from '../../mappers/file.mapper'
import { FileDTO } from '../../dto/file.dto'
import { FileEntity } from '../entities/file.entity'

export class FileRepository implements IFileRepository {
  private readonly repository: Repository<FileEntity>

  constructor () {
    this.repository = AppDataSource.getMongoRepository(FileEntity)
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
}
