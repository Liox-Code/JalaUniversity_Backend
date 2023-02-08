import { AppDataSource } from '../dataSource'
import { FindManyOptions, Repository } from 'typeorm'

import { ICloudStorageAccountRepository } from '../../types/ICloudStorageAccount.type'
import { CloudStorageAccountMapper } from '../../mappers/cloudStorageAccount.mapper'
import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { CloudStorageAccountEntity } from '../entities/cloudStorageAccount.entity'

export class CloudStorageAccountRepository implements ICloudStorageAccountRepository {
  private readonly repository: Repository<CloudStorageAccountEntity>

  constructor () {
    this.repository = AppDataSource.getMongoRepository(CloudStorageAccountEntity)
  }

  createCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    const createCloudStorageAccount = await this.repository.save(CloudStorageAccountMapper.toEntity(cloudStorageAccount))
    return CloudStorageAccountMapper.toDTO(createCloudStorageAccount)
  }

  readCloudStorageAccount = async (cloudStorageAccountId: string) => {
    const foundCloudStorageAccount = await this.repository.findOneBy({ _id: cloudStorageAccountId })

    if (!foundCloudStorageAccount) {
      throw new Error(`Cloud Storage Account with id ${cloudStorageAccountId} not found`)
    }

    return CloudStorageAccountMapper.toDTO(foundCloudStorageAccount)
  }

  updateCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    const { cloudStorageId } = cloudStorageAccount
    const updatedCloudStorageAccount = await this.repository.update({ _id: cloudStorageId }, CloudStorageAccountMapper.toEntity(cloudStorageAccount))

    const didMatch = updatedCloudStorageAccount.raw.matchedCount > 0

    if (!didMatch) {
      throw new Error(`Cloud Storage Account ${cloudStorageId}, matchedCount equal to 0`)
    }

    return didMatch
  }

  deleteCloudStorageAccount = async (cloudStorageAccountId: string) => {
    const options: FindManyOptions<CloudStorageAccountEntity> = {
      where: { _id: cloudStorageAccountId }
    }
    const cloudStorage = await this.repository.find(options)
    const removeResponse = await this.repository.remove(cloudStorage)
    return (removeResponse.length > 0)
  }
}
