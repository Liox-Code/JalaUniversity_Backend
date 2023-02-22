import { StoredFileDTO } from '../../dto/storedFile.dto'
import { MessageBrokerService } from '../../services/messageBroker.service'
import { StoredFileService } from '../../services/storedFile.service'

class MessageBrokerManager {
  messageBrokerService: MessageBrokerService
  storedFileService: StoredFileService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.storedFileService = new StoredFileService()
    this.init()
  }

  private init = async () => {
    this.messageBrokerService.consumeMessage(this.messageAdmin)
  }

  private messageAdmin = async (message: Record<string, unknown>):Promise<Record<string, unknown>> => {
    if (message.action === 'messageAllFilesUploaded') {
      await this.uploadFile(message.data as Record<string, unknown>[])
    }
    return message
  }

  private uploadFile = async (data: Record<string, unknown>[]) => {
    const promises = data.allStoredFiles.map(async (file) => {
      const fileDTO = new StoredFileDTO(file.fileId, file.cloudStorageAccountId, file.webViewLink, file.webContentLink)
      return await this.storedFileService.createStoredFile(fileDTO)
    })
    const result = await Promise.all(promises)
      .then((res) => {
        return res
      })

    console.log(result)
  }
}

export default MessageBrokerManager
