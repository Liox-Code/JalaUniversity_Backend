import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { FileDTO } from '../dto/file.dto'
import { MessageBrokerService } from '../services/messageBroker.service'

export class StatService {
  messageBrokerService: MessageBrokerService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
  }

  async calculateStats (cloudStorageAccount: CloudStorageAccountDTO, file: FileDTO) {
    const newCloudStorageAccount = { ...cloudStorageAccount }
    newCloudStorageAccount.numberDownloads += 1
    newCloudStorageAccount.totalSizeDownloads += file.size

    const newFile = { ...file }
    newFile.numberDownloads += 1
    newFile.totalSizeDownloads += file.size

    const message = {
      action: 'statsCalculated',
      data: {
        account: newCloudStorageAccount,
        file: newFile
      }
    }
    await this.messageBrokerService.publishMessage(message)
  }
}
