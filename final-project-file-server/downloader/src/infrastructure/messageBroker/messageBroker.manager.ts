import { StoredFileDTO } from '../../dto/storedFile.dto'
import { MessageBrokerService } from '../../services/messageBroker.service'
import { StoredFileService } from '../../services/storedFile.service'
import { FileService } from '../../services/file.service'
import { FileDTO } from '../../dto/file.dto'
import { FileUploder, StoreFileUploder } from '../../types/uploader/uploader.type'
import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { DonwloadFileService } from '../../services/donwloadFile.service'

class MessageBrokerManager {
  messageBrokerService: MessageBrokerService
  storedFileService: StoredFileService
  fileService: FileService
  donwloadFileService: DonwloadFileService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.storedFileService = new StoredFileService()
    this.fileService = new FileService()
    this.donwloadFileService = new DonwloadFileService()
    this.init()
  }

  private init = async () => {
    this.messageBrokerService.consumeMessage(this.messageAdmin)
  }

  private messageAdmin = async (message: Record<string, unknown>):Promise<Record<string, unknown>> => {
    try {
      if (message.action === 'messageAllFilesUploaded') {
        await this.uploadFile(message.data as {createdFile: FileUploder, allStoredFiles: StoreFileUploder[]})
      }
      if (message.action === 'statsCalculated') {
        await this.statsCalculated(message.data as {cloudStorageAccount: CloudStorageAccountDTO})
      }
    } catch (error) {
      console.log(error)
    }
    return message
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

  private statsCalculated = async (data: {account: CloudStorageAccountDTO}) => {
    const { account } = data
    this.updateCloudStorageAccount(account)
  }

  private updateCloudStorageAccount = async (cloudStorageAccount: CloudStorageAccountDTO) => {
    await this.donwloadFileService.updateCloudStorageAccount(cloudStorageAccount)
  }
}

export default MessageBrokerManager
