import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { MessageBrokerService } from '../services/messageBroker.service'

export class StatService {
  messageBrokerService: MessageBrokerService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
  }

  async calculateCloudStorageAccount (cloudStorageAccount: CloudStorageAccountDTO) {
    const newCloudStorageAccount = { ...cloudStorageAccount }
    newCloudStorageAccount.numberDownloads += 1
    newCloudStorageAccount.totalSizeDownloads += 1

    const messageAllFilesUploaded = {
      action: 'statsCalculated',
      data: {
        account: newCloudStorageAccount
      }
    }
    await this.messageBrokerService.publishMessage(messageAllFilesUploaded)

    return await newCloudStorageAccount
  }

  calculateFile () {
    console.log('calculate calculateFile')
  }
}
