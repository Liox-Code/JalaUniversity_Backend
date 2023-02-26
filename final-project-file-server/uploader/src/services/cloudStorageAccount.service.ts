import { ICloudStorageAccountRepository } from '../types/ICloudStorageAccount.type'
import { CloudStorageAccountRepository } from '../database/repositories/cloudStorageAccount.repository'
import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { MessageBrokerService } from '../services/messageBroker.service'

export class CloudStorageAccountService {
  private cloudStorageAccount: ICloudStorageAccountRepository
  private messageBrokerService: MessageBrokerService

  constructor () {
    this.cloudStorageAccount = new CloudStorageAccountRepository()
    this.messageBrokerService = new MessageBrokerService()
  }

  createCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    const createdAccount = await this.cloudStorageAccount.createCloudStorageAccount(cloudStorageAccount)

    const messageCreatedAccount = {
      action: 'createCloudStorage',
      data: {
        account: createdAccount
      }
    }

    await this.messageBrokerService.publishMessage(messageCreatedAccount)

    return createdAccount
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
