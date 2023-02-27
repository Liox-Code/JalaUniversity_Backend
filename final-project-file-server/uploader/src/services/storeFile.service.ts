import { FileService } from './file.service'
import { StoreFileRepository } from '../database/repositories/storeFile.repository'
import { CloudStorageAccountRepository } from '../database/repositories/cloudStorageAccount.repository'
import { StoreFileDTO } from '../dto/storeFile.dto'
import { GoogleAPIService } from './drive'
import { MessageBrokerService } from './messageBroker.service'
import { HttpError } from '../middlewares/errorHandler'
import { FileDTO } from '../dto/file.dto'
import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'

export class StoreFileService {
  private fileService: FileService
  private cloudStorageAccountRepository: CloudStorageAccountRepository
  private messageBrokerService: MessageBrokerService
  private storeFileRepository: StoreFileRepository

  constructor () {
    this.fileService = new FileService()
    this.cloudStorageAccountRepository = new CloudStorageAccountRepository()
    this.messageBrokerService = new MessageBrokerService()
    this.storeFileRepository = new StoreFileRepository()
  }

  storeFile = async (file: Express.Multer.File) => {
    const createdFile = await this.storeFileMongoGridFS(file)

    await this.fileService.updateFileStatus(createdFile.id, 'Replicating')

    const messageStoredMongoGridFS = {
      action: 'storedCloudStorage',
      data: {
        createdFile
      }
    }
    await this.messageBrokerService.publishMessage(messageStoredMongoGridFS)

    return createdFile
  }

  storeFileMongoGridFS = async (file: Express.Multer.File) => {
    const createdFile = await this.fileService.createFile(file)

    return createdFile
  }

  storeFileCloudStorage = async (createdFile: FileDTO) => {
    if (!createdFile.id) throw new HttpError(400, 'Created File does not have id')

    const cloudStorageAccounts = await this.cloudStorageAccountRepository.readCloudStorageAccounts()
    const allStoredFiles : StoreFileDTO[] = []

    for (const storageAccount of cloudStorageAccounts) {
      console.log('Start Uploading File')

      const createdStoreFile = await this.uploadFileCloudStorageAccount(createdFile, storageAccount)

      allStoredFiles.push(createdStoreFile)
    }

    await this.fileService.updateFileStatus(createdFile.id, 'Uploaded')

    console.log('All uploaded sucessfully')

    return allStoredFiles
  }

  uploadFileCloudStorageAccount = async (createdFile: FileDTO, cloudStorageAccount: CloudStorageAccountDTO): Promise<StoreFileDTO> => {
    if (!createdFile.id) throw new HttpError(400, 'Created File does not have id')

    const drive = new GoogleAPIService({
      credentialClientID: cloudStorageAccount.credentialClientID,
      credentialRedirecrUri: cloudStorageAccount.credentialRedirecrUri,
      credentialRefreshToken: cloudStorageAccount.credentialRefreshToken,
      credentialSecret: cloudStorageAccount.credentialSecret
    })

    const uploadedFile = await drive.uploadFile({
      originalname: createdFile.fileName,
      mimetype: createdFile.mimeType,
      buffer: createdFile.content
    })

    if (!uploadedFile || !uploadedFile.webViewLink || !uploadedFile.webContentLink) throw new HttpError(400, 'No files uploaded')

    const storeFileDTO = new StoreFileDTO(
      cloudStorageAccount.cloudStorageAccountId,
      createdFile.id,
      uploadedFile.webViewLink,
      uploadedFile.webContentLink
    )

    const createdStoreFile = await this.storeFileRepository.createStoreFile(storeFileDTO)

    return createdStoreFile
  }

  deleteStorageFile = async (cloudStorageAccountId: string) => {
    await this.storeFileRepository.deleteStoreFileByCloudStorageAccount(cloudStorageAccountId)
  }
}
