import { AppDataSource } from '../dataSource'
import { IStoredFile } from '../../types/IStoredFile.type'
import { EntityManager, FindManyOptions, Repository } from 'typeorm'
import { StoreFileMapper } from '../../mappers/storeFile.mapper'
import { StoreFileDTO } from '../../dto/storeFile.dto'
import { StoreFileEntity } from '../entities/storeFile.entity'
import { HttpError } from '../../middlewares/errorHandler'
import { ObjectId } from 'mongodb'

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

  deleteStoreFileByCloudStorageAccount = async (cloudStorageAccountId: string) => {
    if (!cloudStorageAccountId) throw new HttpError(500, 'cloudStorageAccountId not provided')

    const id: ObjectId = new ObjectId(cloudStorageAccountId)

    const options: FindManyOptions<StoreFileEntity> = {
      where: { cloudStorageAccountId: id }
    }
    const storageAccount = await this.repository.find(options)
    const removeResponse = await this.repository.remove(storageAccount)
    return (removeResponse.length > 0)
  }
}
