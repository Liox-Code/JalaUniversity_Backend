import { MessageBrokerService } from '../../services/messageBroker.service'
import { StatService } from '../../services/stat.service'
import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { StoredFileDTO } from '../../dto/storedFile.dto'

class MessageBrokerManager {
  messageBrokerService: MessageBrokerService
  statService: StatService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.statService = new StatService()
    this.init()
  }

  private init = async () => {
    this.messageBrokerService.consumeMessage(this.messageAdmin)
  }

  private messageAdmin = async (message: Record<string, unknown>):Promise<Record<string, unknown>> => {
    try {
      console.log('message received')
      if (message.action === 'calculateDonwloads') {
        const data = message.data as { account: CloudStorageAccountDTO, storedFile: StoredFileDTO }
        await this.calculateDonwloads(data)
      }
      console.log(message.action)
    } catch (error) {
      console.log(error)
    }
    return message
  }

  private calculateDonwloads = async (data: { account: CloudStorageAccountDTO, storedFile: StoredFileDTO }) => {
    const { account, storedFile } = data
    console.log(account)
    await this.statService.calculateCloudStorageAccount(account)
    await this.statService.calculateFile()
  }
}

export default MessageBrokerManager
