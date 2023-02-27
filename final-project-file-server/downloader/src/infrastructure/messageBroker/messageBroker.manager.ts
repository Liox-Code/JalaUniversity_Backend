import { StoredFileDTO } from '../../dto/storedFile.dto'
import { MessageBrokerService } from '../../services/messageBroker.service'
import { StoredFileService } from '../../services/storedFile.service'
import { FileService } from '../../services/file.service'
import { FileDTO } from '../../dto/file.dto'
import { FileUploder, StoreFileUploder, CloudStorageAccountUploder } from '../../types/uploader/uploader.type'
import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { DonwloadFileService } from '../../services/donwloadFile.service'
import { CloudStorageAccountService } from '../../services/cloudStorageAccount.service'
import { HttpError } from '../../middlewares/errorHandler'

class MessageBrokerManager {
  messageBrokerService: MessageBrokerService
  storedFileService: StoredFileService
  fileService: FileService
  donwloadFileService: DonwloadFileService
  cloudStorageAccountService: CloudStorageAccountService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.storedFileService = new StoredFileService()
    this.fileService = new FileService()
    this.donwloadFileService = new DonwloadFileService()
    this.cloudStorageAccountService = new CloudStorageAccountService()
    this.init()
  }

  private init = async () => {
    this.messageBrokerService.consumeMessage(this.messageAdmin)
  }

  private messageAdmin = async (message: Record<string, unknown>):Promise<Record<string, unknown>> => {
    try {
      if (message.action === 'createCloudStorage') {
        await this.createCloudStorage(message.data as {account: CloudStorageAccountUploder})
      }
      if (message.action === 'deleteCloudStorage') {
        await this.deleteCloudStorage(message.data as {cloudStorageAccountId: string})
      }
      if (message.action === 'updateFile') {
        await this.updateFile(message.data as { file: FileDTO })
      }
      if (message.action === 'deleteFile') {
        await this.deleteFile(message.data as { file: FileDTO })
      }
      if (message.action === 'messageAllFilesUploaded') {
        await this.uploadFile(message.data as {createdFile: FileUploder, allStoredFiles: StoreFileUploder[]})
      }
      if (message.action === 'allFilesUploadedNewAccount') {
        await this.allFilesUploadedNewAccount(message.data as {storedFile: StoreFileUploder})
      }
      if (message.action === 'statsCalculated') {
        await this.statsCalculated(message.data as {account: CloudStorageAccountDTO, file: FileDTO})
      }
    } catch (error) {
      console.log(error)
    }
    return message
  }

  private createCloudStorage = async (data: {account: CloudStorageAccountUploder}) => {
    const { account } = data
    const cloudStorageAccount: CloudStorageAccountDTO = {
      id: account.cloudStorageAccountId,
      email: account.email,
      numberDownloads: 0,
      totalSizeDownloads: 0
    }
    await this.cloudStorageAccountService.createCloudStorageAccount(cloudStorageAccount)
  }

  private deleteCloudStorage = async (data: {cloudStorageAccountId: string}) => {
    const { cloudStorageAccountId } = data
    await this.cloudStorageAccountService.deleteCloudStorageAccount(cloudStorageAccountId)
    await this.storedFileService.deleteStoredFileByCloudStorageAccount(cloudStorageAccountId)
  }

  private updateFile = async (data: { file: FileUploder }) => {
    const { file } = data
    const fileDTO: FileDTO = {
      id: file.id,
      fileId: file.fileId,
      name: file.fileName,
      numberDownloads: 0,
      size: file.size,
      totalSizeDownloads: 0
    }
    try {
      await this.fileService.updateFile(fileDTO.id, fileDTO)
    } catch (error) {
      console.log(error)
    }
  }

  private deleteFile = async (data: { file: FileUploder }) => {
    const { file } = data
    try {
      await this.fileService.deleteFile(file.id)
    } catch (error) {
      console.log(error)
    }
  }

  private uploadFile = async (data: {createdFile: FileUploder, allStoredFiles: StoreFileUploder[]}) => {
    const file: FileDTO = {
      id: data.createdFile.id,
      fileId: data.createdFile.fileId,
      name: data.createdFile.fileName,
      numberDownloads: 0,
      size: data.createdFile.size,
      totalSizeDownloads: 0
    }
    await this.fileService.createFile(file)

    const promises = data.allStoredFiles.map(async (file) => {
      const storedFileDTO = new StoredFileDTO(file.fileId, file.cloudStorageAccountId, file.cloudFileId, file.webViewLink, file.webContentLink)
      return await this.storedFileService.createStoredFile(storedFileDTO)
    })
    const result = await Promise.all(promises)
      .then((res) => {
        return res
      })
  }

  private allFilesUploadedNewAccount = async (data: {storedFile: StoreFileUploder}) => {
    const { storedFile } = data

    const storedFileDTO = new StoredFileDTO(storedFile.fileId, storedFile.cloudStorageAccountId, storedFile.cloudFileId, storedFile.webViewLink, storedFile.webContentLink)

    await this.storedFileService.createStoredFile(storedFileDTO)
  }

  private statsCalculated = async (data: {account: CloudStorageAccountDTO, file: FileDTO}) => {
    const { account, file } = data

    if (!account.id) throw new HttpError(400, 'Accoun id not found')
    if (!file.id) throw new HttpError(400, 'File id not found')

    await this.cloudStorageAccountService.updateCloudStorageAccount(account.id, account)
    await this.fileService.updateFile(file.id, file)
  }
}

export default MessageBrokerManager
