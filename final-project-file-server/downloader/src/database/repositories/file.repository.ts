import { AppDataSource } from '../dataSource'
import { IFileRepository } from '../../types/IFileRepository.type'
import { EntityManager, FindManyOptions, Repository } from 'typeorm'
import { FileMapper } from '../../mappers/file.mapper'
import { FileDTO } from '../../dto/file.dto'
import { FileEntity } from '../entities/file.entity'
import { HttpError } from '../../middlewares/errorHandler'

export class FileRepository implements IFileRepository {
  private readonly repository: Repository<FileEntity>
  private readonly manager: EntityManager

  constructor () {
    this.repository = AppDataSource.getRepository(FileEntity)
    this.manager = AppDataSource.manager
  }

  createFile = async (file: FileDTO): Promise<FileDTO> => {
    const createdFile = await this.repository.save(FileMapper.toEntity(file))
    return FileMapper.toDTO(createdFile)
  }

  readFiles = async () => {
    const foundFile = await this.repository.find()

    if (!foundFile) throw new HttpError(400, 'Any file found')

    const fileDTOs = foundFile.map((file) => {
      return FileMapper.toDTO(file)
    })

    return fileDTOs
  }

  readFileById = async (fileId: string): Promise<FileDTO> => {
    if (!fileId) throw new HttpError(400, 'fileId not provided')

    const foundFile = await this.repository.findOneBy({ id: fileId })

    if (!foundFile) throw new HttpError(400, `File with id ${fileId} not found`)

    return FileMapper.toDTO(foundFile)
  }

  updateFile = async (fileId: string, file: FileDTO) => {
    const updatedFile = await this.repository.update({ id: fileId }, FileMapper.toEntity(file))

    const didAffect = (updatedFile.affected && updatedFile.affected > 0)

    if (!didAffect) throw new HttpError(400, `StoredFile ${fileId}, affected equal to 0`)

    return didAffect
  }

  deleteFile = async (fileId: string) => {
    const options: FindManyOptions<FileEntity> = {
      where: { id: fileId }
    }
    const file = await this.repository.find(options)
    const deleteResponse = await this.repository.remove(file)
    return (deleteResponse.length > 0)
  }
}
