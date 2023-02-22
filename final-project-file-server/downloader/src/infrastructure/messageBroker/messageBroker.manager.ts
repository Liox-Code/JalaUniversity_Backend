import { StoredFileDTO } from '../../dto/storedFile.dto'
import { MessageBrokerService } from '../../services/messageBroker.service'
import { StoredFileService } from '../../services/storedFile.service'
import { FileService } from '../../services/file.service'
import { FileDTO } from '../../dto/file.dto'

class MessageBrokerManager {
  messageBrokerService: MessageBrokerService
  storedFileService: StoredFileService
  fileService: FileService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.storedFileService = new StoredFileService()
    this.fileService = new FileService()
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
    const file: FileDTO = {
      fileId: data.createdFile.fileId,
      name: data.createdFile.fileName,
      numberDownloads: 0,
      size: 0,
      totalSizeDownloads: 0
    }
    await this.fileService.createFile(file)

    console.log(`data allStoredFiles: ${JSON.stringify(data.allStoredFiles)}`)

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
}

export default MessageBrokerManager
