import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { FileDTO } from '../../dto/file.dto'
import { MessageBrokerService } from '../../services/messageBroker.service'
import { StoreFileService } from '../../services/storeFile.service'
import { CloudStorageAccountService } from '../../services/cloudStorageAccount.service'
import { FileService } from '../../services/file.service'

class MessageBrokerManager {
  messageBrokerService: MessageBrokerService
  storeFileService: StoreFileService
  cloudStorageAccountService: CloudStorageAccountService
  fileService: FileService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.storeFileService = new StoreFileService()
    this.cloudStorageAccountService = new CloudStorageAccountService()
    this.fileService = new FileService()
    this.init()
  }

  private init = async () => {
    this.messageBrokerService.consumeMessage(this.messageAdmin)
  }

  private messageAdmin = async (message: Record<string, unknown>):Promise<Record<string, unknown>> => {
    try {
      if (message.action === 'storedCloudStorage') {
        await this.storedCloudStorage(message.data as { createdFile: FileDTO })
      }
      if (message.action === 'updateStoredCloudStorage') {
        await this.updateStoredCloudStorage(message.data as { createdFile: FileDTO, file: Express.Multer.File })
      }
      if (message.action === 'newCloudStorageAccount') {
        await this.newCloudStorageAccount(message.data as { file: FileDTO, cloudStorageAccount: CloudStorageAccountDTO })
      }
      if (message.action === 'deleteAllFilesOnCloud') {
        await this.deleteAllFilesOnCloud(message.data as {cloudStorageAccountId: CloudStorageAccountDTO})
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

  private deleteAllFilesOnCloud = async (data: {cloudStorageAccount: CloudStorageAccountDTO}) => {
    const { cloudStorageAccount: cloudStorageAccountId } = data
    await this.cloudStorageAccountService.deleteAllFilesOnCloudAccount(cloudStorageAccountId)
    console.log('All Files deleted Successfully')
  }
}

export default MessageBrokerManager
