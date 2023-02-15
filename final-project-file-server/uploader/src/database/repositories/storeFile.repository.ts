import { AppDataSource } from '../dataSource'
import { IStoredFile } from '../../types/IStoredFile.type'
import { EntityManager, Repository } from 'typeorm'
import { StoreFileMapper } from '../../mappers/storeFile.mapper'
import { StoreFileDTO } from '../../dto/storeFile.dto'
import { StoreFileEntity } from '../entities/storeFile.entity'

export class StoreFileRepository implements IStoredFile {
  private readonly repository: Repository<StoreFileEntity>
  private readonly manager: EntityManager

  constructor () {
    this.repository = AppDataSource.getMongoRepository(StoreFileEntity)
    this.manager = AppDataSource.manager
  }

  createStoreFile = async (storeFile: StoreFileDTO): Promise<StoreFileDTO> => {
    const createdStoreFile = await this.repository.save(StoreFileMapper.toEntity(storeFile))
    return StoreFileMapper.toDTO(createdStoreFile)
  }
}
