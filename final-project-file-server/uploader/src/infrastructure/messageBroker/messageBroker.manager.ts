import { HttpError, errorHandlerRabbitMQ } from '../../middlewares/errorHandler'
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
    console.log(message)
    try {
      if (message.action === 'storedCloudStorage') {
        await this.storedCloudStorage(message.data)
      }
    } catch (error) {
      console.log(error)
    }
    return message
  }

  private storedCloudStorage = async (data: Record<string, unknown>) => {
    const { createdFile, file } = data
    try {
      const allStoredFiles = await this.storeFileService.storeFileCloudStorage(createdFile, file)

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
}

export default MessageBrokerManager
