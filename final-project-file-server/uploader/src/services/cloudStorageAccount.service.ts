import { ICloudStorageAccountRepository } from '../types/ICloudStorageAccount.type'
import { CloudStorageAccountRepository } from '../database/repositories/cloudStorageAccount.repository'
import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'

export class CloudStorageAccountService {
  private cloudStorageAccount: ICloudStorageAccountRepository

  constructor () {
    this.cloudStorageAccount = new CloudStorageAccountRepository()
  }

  createCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    return this.cloudStorageAccount.createCloudStorageAccount(cloudStorageAccount)
  }

  readCloudStorageAccounts = async () => {
    return await this.cloudStorageAccount.readCloudStorageAccounts()
  }

  readCloudStorageAccount = async (cloudStorageAccountId: string) => {
    return await this.cloudStorageAccount.readCloudStorageAccount(cloudStorageAccountId)
  }

  updateCloudStorageAccount = async (cloudStorageAccountId: string, cloudStorageAccount: CloudStorageAccountDTO) => {
    return await this.cloudStorageAccount.updateCloudStorageAccount(cloudStorageAccountId, cloudStorageAccount)
  }

  deleteCloudStorageAccount = async (cloudStorageAccountId: string) => {
    return await this.cloudStorageAccount.deleteCloudStorageAccount(cloudStorageAccountId)
  }
}
