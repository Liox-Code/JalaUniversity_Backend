import { MessageBroker } from '../infrastructure/messageBroker/messageBroker'
import { exchange } from '../infrastructure/messageBroker/exchanges'

export class MessageBrokerService {
  private messageBroker: MessageBroker

  constructor () {
    this.messageBroker = new MessageBroker()
  }

  publishMessage = async (message: Record<string, unknown>) => {
    const response = await this.messageBroker.publishMessage(exchange, message)
    return (response)
  }

  consumeMessage = async () => {
    const response = await this.messageBroker.consumeMessage(exchange)
    return (response)
  }
}
