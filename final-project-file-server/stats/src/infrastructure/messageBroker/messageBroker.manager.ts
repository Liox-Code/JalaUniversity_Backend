import { MessageBrokerService } from '../../services/messageBroker.service'

class MessageBrokerManager {
  messageBrokerService: MessageBrokerService

  constructor () {
    this.messageBrokerService = new MessageBrokerService()
    this.init()
  }

  private init = async () => {
    this.messageBrokerService.consumeMessage(this.messageAdmin)
  }

  private messageAdmin = async (message: Record<string, unknown>):Promise<Record<string, unknown>> => {
    try {
      console.log(message.action)
    } catch (error) {
      console.log(error)
    }
    return message
  }
}

export default MessageBrokerManager
