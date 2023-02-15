import { FindManyOptions, Repository } from 'typeorm'
import { StoredFileDTO } from '../../dto/storedFile.dto'
import { StoredFileMapper } from '../../mappers/storedFile.mapper'
import { IStoredFileRepository } from '../../types/IStoredFileRepository.type'
import { AppDataSource } from '../dataSource'
import { StoredFileEntity } from '../entities/storedFile.entity'

export class StoredFileRepository implements IStoredFileRepository {
  private readonly repository: Repository<StoredFileEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(StoredFileEntity)
  }

  createStoredFile = async (storedFileId: StoredFileDTO) => {
    const createdStoredFile = await this.repository.save(StoredFileMapper.toEntity(storedFileId))
    return StoredFileMapper.toDTO(createdStoredFile)
  }

  readAllStoredFiles = async () => {
    const foundStoredFile = await this.repository.find()

    if (!foundStoredFile) {
      throw new Error('Any StoredFile found')
    }

    const foundStoredFileDTO = foundStoredFile.map((storedFile) => {
      return StoredFileMapper.toDTO(storedFile)
    })

    return foundStoredFileDTO
  }

  readStoredFile = async (storedFileId: string) => {
    const foundStoredFile = await this.repository.findOneBy({ id: storedFileId })

    if (!foundStoredFile) {
      throw new Error(`StoredFile with id ${storedFileId} not found`)
    }

    return StoredFileMapper.toDTO(foundStoredFile)
  }

  updateStoredFile = async (storedFileId: string, storedFile: StoredFileDTO) => {
    const updatedStoredFile = await this.repository.update({ id: storedFileId }, StoredFileMapper.toEntity(storedFile))

    const didAffect = (updatedStoredFile.affected && updatedStoredFile.affected > 0)

    if (!didAffect) {
      throw new Error(`StoredFile ${storedFileId}, affected equal to 0`)
    }

    return didAffect
  }

  deleteStoredFile = async (storedFileId: string) => {
    const options: FindManyOptions<StoredFileEntity> = {
      where: { id: storedFileId }
    }
    const storedFile = await this.repository.find(options)
    const removeResponse = await this.repository.remove(storedFile)
    return (removeResponse.length > 0)
  }
}
