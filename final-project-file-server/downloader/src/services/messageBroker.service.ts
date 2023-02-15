import { MessageBroker } from '../infrastructure/messageBroker/messageBroker'
import { fileExchange } from '../infrastructure/messageBroker/exchanges'

export class MessageBrokerService {
  private messageBroker: MessageBroker

  constructor () {
    this.messageBroker = new MessageBroker()
  }

  publishMessage = async (message: string) => {
    const response = await this.messageBroker.publishMessage(fileExchange, message)
    return (response)
  }

  consumeMessage = async (action: (message: Record<string, unknown>) => Promise<Record<string, unknown>>) => {
    const response = await this.messageBroker.consumeMessage(fileExchange, action)
    return (response)
  }
}
