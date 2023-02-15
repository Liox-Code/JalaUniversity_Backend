import { AppDataSource } from '../dataSource'
import { FindManyOptions, Repository } from 'typeorm'

import { ICloudStorageAccountRepository } from '../../types/ICloudStorageAccount.type'
import { CloudStorageAccountMapper } from '../../mappers/cloudStorageAccount.mapper'
import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { CloudStorageAccountEntity } from '../entities/cloudStorageAccount.entity'
import { ObjectId } from 'mongodb'

export class CloudStorageAccountRepository implements ICloudStorageAccountRepository {
  private readonly repository: Repository<CloudStorageAccountEntity>

  constructor () {
    this.repository = AppDataSource.getMongoRepository(CloudStorageAccountEntity)
  }

  createCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    const createCloudStorageAccount = await this.repository.save(CloudStorageAccountMapper.toEntity(cloudStorageAccount))
    return createCloudStorageAccount
  }

  readCloudStorageAccount = async (cloudStorageAccountId: string) => {
    if (!cloudStorageAccountId) throw new Error('cloudStorageAccountId not provided')

    const id: ObjectId = new ObjectId(cloudStorageAccountId)

    const foundCloudStorageAccount = await this.repository.findOneBy({ _id: id })

    if (!foundCloudStorageAccount) {
      throw new Error(`Cloud Storage Account with id ${cloudStorageAccountId} not found`)
    }

    return foundCloudStorageAccount
  }

  readCloudStorageAccounts = async () => {
    const foundCloudStorageAccounts = await this.repository.find()

    if (!foundCloudStorageAccounts) {
      throw new Error('Cloud Storage Accounts not found')
    }

    return foundCloudStorageAccounts
  }

  updateCloudStorageAccount = async (cloudStorageAccountId: string, cloudStorageAccount: CloudStorageAccountDTO) => {
    if (!cloudStorageAccountId) throw new Error('cloudStorageAccountId not provided')

    const id: ObjectId = new ObjectId(cloudStorageAccountId)
    const updatedCloudStorageAccount = await this.repository.update({ _id: id }, CloudStorageAccountMapper.toEntity(cloudStorageAccount))

    const didMatch = updatedCloudStorageAccount.raw.matchedCount > 0

    if (!didMatch) {
      throw new Error(`Cloud Storage Account ${cloudStorageAccountId}, matchedCount equal to 0`)
    }

    return didMatch
  }

  deleteCloudStorageAccount = async (cloudStorageAccountId: string) => {
    if (!cloudStorageAccountId) throw new Error('cloudStorageAccountId not provided')

    const id: ObjectId = new ObjectId(cloudStorageAccountId)
    const options: FindManyOptions<CloudStorageAccountEntity> = {
      where: { _id: id }
    }
    const cloudStorage = await this.repository.find(options)
    const removeResponse = await this.repository.remove(cloudStorage)
    return (removeResponse.length > 0)
  }
}
