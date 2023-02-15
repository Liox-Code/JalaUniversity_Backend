import { FileService } from './file.service'
import { CloudStorageAccountService } from './cloudStorageAccount.service'
import { StoreFileRepository } from '../database/repositories/storeFile.repository'
import { StoreFileDTO } from '../dto/storeFile.dto'
import { GoogleAPIService } from './drive'

export class StoreFileService {
  private fileService: FileService
  private cloudStorageAccountService: CloudStorageAccountService
  private storeFileRepository: StoreFileRepository

  constructor () {
    this.fileService = new FileService()
    this.cloudStorageAccountService = new CloudStorageAccountService()
    this.storeFileRepository = new StoreFileRepository()
  }

  storeFile = async (file: Express.Multer.File) => {
    const createdFile = await this.fileService.createFile(file)
    const cloudStorageAccounts = await this.cloudStorageAccountService.readCloudStorageAccounts()

    const promise = cloudStorageAccounts.map(async (account) => {
      const drive = new GoogleAPIService({
        credentialClientID: account.credentialClientID,
        credentialRedirecrUri: account.credentialRedirecrUri,
        credentialRefreshToken: account.credentialRefreshToken,
        credentialSecret: account.credentialSecret
      })

      const uploadedFile = await drive.uploadFile(file)

      if (!uploadedFile || !uploadedFile.webViewLink || !uploadedFile.webContentLink) throw new Error('No files uploaded')

      const storeFileDTO = new StoreFileDTO(
        account.cloudStorageAccountId,
        createdFile.fileId,
        uploadedFile.webViewLink,
        uploadedFile.webContentLink
      )

      const createdStoreFile = await this.storeFileRepository.createStoreFile(storeFileDTO)
      return createdStoreFile
    })

    const storedFiles = await Promise.all(promise)
      .then((response) => {
        return response
      })
      .catch((error) => {
        throw new Error(error)
      })

    return storedFiles
  }
}
