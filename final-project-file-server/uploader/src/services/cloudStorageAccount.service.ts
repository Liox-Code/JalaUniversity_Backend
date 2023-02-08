import { ICloudStorageAccountRepository } from '../types/ICloudStorageAccount.repository'
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

  readCloudStorageAccount = async (cloudStorageAccountId: string) => {
    return await this.cloudStorageAccount.readCloudStorageAccount(cloudStorageAccountId)
  }

  updateCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    return await this.cloudStorageAccount.updateCloudStorageAccount(cloudStorageAccount)
  }

  deleteCloudStorageAccount = async (cloudStorageAccountId: string) => {
    return await this.cloudStorageAccount.deleteCloudStorageAccount(cloudStorageAccountId)
  }
}
