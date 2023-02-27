import { ICloudStorageAccountRepository } from '../types/ICloudStorageAccount.type'
import { CloudStorageAccountRepository } from '../database/repositories/cloudStorageAccount.repository'
import { IFileRepository } from '../types/IFile.type'
import { FileRepository } from '../database/repositories/file.repository'
import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { StoreFileService } from '../services/storeFile.service'
import { MessageBrokerService } from '../services/messageBroker.service'
import { GoogleAPIService } from './drive'

export class CloudStorageAccountService {
  private cloudStorageAccountRepository: ICloudStorageAccountRepository
  private fileRepository: IFileRepository
  private messageBrokerService: MessageBrokerService
  private storeFileService: StoreFileService

  constructor () {
    this.cloudStorageAccountRepository = new CloudStorageAccountRepository()
    this.fileRepository = new FileRepository()
    this.messageBrokerService = new MessageBrokerService()
    this.storeFileService = new StoreFileService()
  }

  createCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    const createdAccount = await this.cloudStorageAccountRepository.createCloudStorageAccount(cloudStorageAccount)

    const messageCreatedAccount = {
      action: 'createCloudStorage',
      data: {
        account: createdAccount
      }
    }

    await this.messageBrokerService.publishMessage(messageCreatedAccount)

    const allFiles = await this.fileRepository.readFiles()

    for (const file of allFiles) {
      const messageStoredMongoGridFS = {
        action: 'newCloudStorageAccount',
        data: {
          file,
          cloudStorageAccount: createdAccount
        }
      }
      await this.messageBrokerService.publishMessage(messageStoredMongoGridFS)
    }

    return createdAccount
  }

  readCloudStorageAccounts = async () => {
    return await this.cloudStorageAccountRepository.readCloudStorageAccounts()
  }

  readCloudStorageAccount = async (cloudStorageAccountId: string) => {
    return await this.cloudStorageAccountRepository.readCloudStorageAccount(cloudStorageAccountId)
  }

  updateCloudStorageAccount = async (cloudStorageAccountId: string, cloudStorageAccount: CloudStorageAccountDTO) => {
    return await this.cloudStorageAccountRepository.updateCloudStorageAccount(cloudStorageAccountId, cloudStorageAccount)
  }

  deleteCloudStorageAccount = async (cloudStorageAccountId: string) => {
    const cloudStorageAccount = await this.cloudStorageAccountRepository.readCloudStorageAccount(cloudStorageAccountId)

    const messageDeleteAcountFiles = {
      action: 'deleteAllFilesOnCloud',
      data: {
        cloudStorageAccount
      }
    }

    await this.messageBrokerService.publishMessage(messageDeleteAcountFiles)

    await this.storeFileService.deleteStoreFileByCloudStorageAccount(cloudStorageAccountId)

    await this.cloudStorageAccountRepository.deleteCloudStorageAccount(cloudStorageAccountId)

    const message = {
      action: 'deleteCloudStorage',
      data: {
        cloudStorageAccountId
      }
    }

    await this.messageBrokerService.publishMessage(message)
  }

  deleteAllFilesOnCloudAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    const drive = new GoogleAPIService({
      credentialClientID: cloudStorageAccount.credentialClientID,
      credentialRedirecrUri: cloudStorageAccount.credentialRedirecrUri,
      credentialRefreshToken: cloudStorageAccount.credentialRefreshToken,
      credentialSecret: cloudStorageAccount.credentialSecret
    })

    let nextPageToken
    do {
      const driveFile = await drive.readFiles(1000, nextPageToken)
      nextPageToken = driveFile.nextPageToken

      if (!driveFile.files) return

      for (const file of driveFile.files) {
        if (!file.id) return
        await drive.deleteFile(file.id)
      }
    } while (nextPageToken)
  }
}
