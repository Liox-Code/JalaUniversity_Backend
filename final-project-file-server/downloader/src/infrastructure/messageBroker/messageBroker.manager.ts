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
      if (message.action === 'messageAllFilesUploaded') {
        await this.uploadFile(message.data as {createdFile: FileUploder, allStoredFiles: StoreFileUploder[]})
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
      const storedFileDTO = new StoredFileDTO(file.fileId, file.cloudStorageAccountId, file.webViewLink, file.webContentLink)
      return await this.storedFileService.createStoredFile(storedFileDTO)
    })
    const result = await Promise.all(promises)
      .then((res) => {
        return res
      })

    console.log(`result: ${JSON.stringify(result)}`)
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
