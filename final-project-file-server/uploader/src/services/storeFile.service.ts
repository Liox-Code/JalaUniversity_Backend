import { FileService } from './file.service'
import { CloudStorageAccountService } from './cloudStorageAccount.service'
import { StoreFileRepository } from '../database/repositories/storeFile.repository'
import { StoreFileDTO } from '../dto/storeFile.dto'
import { GoogleAPIService } from './drive'
import { MessageBrokerService } from './messageBroker.service'
import { HttpError } from '../middlewares/errorHandler'
import { FileDTO } from '../dto/file.dto'

export class StoreFileService {
  private fileService: FileService
  private cloudStorageAccountService: CloudStorageAccountService
  private messageBrokerService: MessageBrokerService
  private storeFileRepository: StoreFileRepository

  constructor () {
    this.fileService = new FileService()
    this.cloudStorageAccountService = new CloudStorageAccountService()
    this.messageBrokerService = new MessageBrokerService()
    this.storeFileRepository = new StoreFileRepository()
  }

  storeFile = async (file: Express.Multer.File) => {
    const createdFile = await this.storeFileMongoGridFS(file)

    await this.fileService.updateFileStatus(createdFile.fileId, 'Replicating')

    const messageStoredMongoGridFS = {
      action: 'storedCloudStorage',
      data: {
        createdFile,
        file
      }
    }
    await this.messageBrokerService.publishMessage(messageStoredMongoGridFS)

    return createdFile
  }

  storeFileMongoGridFS = async (file: Express.Multer.File) => {
    const createdFile = await this.fileService.createFile(file)

    return createdFile
  }

  storeFileCloudStorage = async (createdFile: FileDTO, file: Express.Multer.File) => {
    const cloudStorageAccounts = await this.cloudStorageAccountService.readCloudStorageAccounts()
    const allStoredFiles : StoreFileDTO[] = []

    for (const storageAccount of cloudStorageAccounts) {
      console.log('Start Uploading File')

      const drive = new GoogleAPIService({
        credentialClientID: storageAccount.credentialClientID,
        credentialRedirecrUri: storageAccount.credentialRedirecrUri,
        credentialRefreshToken: storageAccount.credentialRefreshToken,
        credentialSecret: storageAccount.credentialSecret
      })

      const uploadedFile = await drive.uploadFile(file)

      if (!uploadedFile || !uploadedFile.webViewLink || !uploadedFile.webContentLink) throw new HttpError(400, 'No files uploaded')

      const storeFileDTO = new StoreFileDTO(
        storageAccount.cloudStorageAccountId,
        createdFile.fileId,
        uploadedFile.webViewLink,
        uploadedFile.webContentLink
      )
      const createdStoreFile = await this.storeFileRepository.createStoreFile(storeFileDTO)

      allStoredFiles.push(createdStoreFile)
    }

    await this.fileService.updateFileStatus(createdFile.fileId, 'Uploaded')

    console.log('All uploaded sucessfully')

    return allStoredFiles
  }
}
