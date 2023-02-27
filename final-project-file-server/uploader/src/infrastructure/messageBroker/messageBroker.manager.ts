import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { FileDTO } from '../../dto/file.dto'
import { MessageBrokerService } from '../../services/messageBroker.service'
import { StoreFileService } from '../../services/storeFile.service'

class MessageBrokerManager {
  messageBrokerService: MessageBrokerService
  storeFileService: StoreFileService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.storeFileService = new StoreFileService()
    this.init()
  }

  private init = async () => {
    this.messageBrokerService.consumeMessage(this.messageAdmin)
  }

  private messageAdmin = async (message: Record<string, unknown>):Promise<Record<string, unknown>> => {
    try {
      if (message.action === 'storedCloudStorage') {
        await this.storedCloudStorage(message.data)
      }
      if (message.action === 'updateStoredCloudStorage') {
        await this.updateStoredCloudStorage(message.data)
      }
      if (message.action === 'newCloudStorageAccount') {
        await this.newCloudStorageAccount(message.data)
      }
    } catch (error) {
      console.log(error)
    }
    return message
  }

  private storedCloudStorage = async (data: { createdFile: FileDTO }) => {
    const { createdFile } = data
    try {
      const allStoredFiles = await this.storeFileService.storeFileCloudStorage(createdFile)

      const messageAllFilesUploaded = {
        action: 'messageAllFilesUploaded',
        data: {
          createdFile,
          allStoredFiles
        }
      }
      await this.messageBrokerService.publishMessage(messageAllFilesUploaded)
    } catch (error) {
      console.log(error)
    }
  }

  private newCloudStorageAccount = async (data: { file: FileDTO, cloudStorageAccount: CloudStorageAccountDTO }) => {
    const { file, cloudStorageAccount } = data
    try {
      const storeFile = await this.storeFileService.uploadFileCloudStorageAccount(file, cloudStorageAccount)

      const messageAllFilesUploaded = {
        action: 'allFilesUploadedNewAccount',
        data: {
          storedFile: storeFile
        }
      }
      await this.messageBrokerService.publishMessage(messageAllFilesUploaded)
    } catch (error) {
      console.log(error)
    }
  }

  private updateStoredCloudStorage = async (data: { createdFile: FileDTO, file: Express.Multer.File }) => {
    const { file } = data
    try {
      console.log(file)
    } catch (error) {
      console.log(error)
    }
  }
}

export default MessageBrokerManager
