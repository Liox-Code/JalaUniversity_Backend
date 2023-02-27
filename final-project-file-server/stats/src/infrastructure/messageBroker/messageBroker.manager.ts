import { MessageBrokerService } from '../../services/messageBroker.service'
import { StatService } from '../../services/stat.service'
import { CloudStorageAccountDTO } from '../../dto/cloudStorageAccount.dto'
import { FileDTO } from '../../dto/file.dto'

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
      if (message.action === 'calculateDonwloads') {
        const data = message.data as { account: CloudStorageAccountDTO, file: FileDTO }
        await this.calculateDonwloads(data)
      }
    } catch (error) {
      console.log(error)
    }
    return message
  }

  private calculateDonwloads = async (data: { account: CloudStorageAccountDTO, file: FileDTO }) => {
    const { account, file } = data
    await this.statService.calculateStats(account, file)
  }
}

export default MessageBrokerManager
