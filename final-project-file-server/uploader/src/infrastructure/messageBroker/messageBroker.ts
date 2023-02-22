import amqplib, { Channel, Connection } from 'amqplib'
import { TExchange } from '../../types/infrastructure/exchanges.type'
import { HttpError, errorHandlerRabbitMQ } from '../../middlewares/errorHandler'

export class MessageBroker {
  static instance: MessageBroker | null
  private _channel!: Channel
  private _connection!: Connection

  get channel () {
    return this._channel
  }

  constructor () {
    if (MessageBroker.instance) {
      console.log('Message Already created')
      return MessageBroker.instance
    }

    MessageBroker.instance = this
  }

  async connect () {
    try {
      const amqpServer = {
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest'
      }
      this._connection = await amqplib.connect(amqpServer)
      this._channel = await this._connection.createChannel()
    } catch (error) {
      throw new Error('Error on conection of Message Broker Connection on Uploader')
    }
  }

  async publishMessage (exchange: TExchange, message: Record<string, unknown>) {
    try {
      const messageString = JSON.stringify(message)
      await this._channel.assertExchange(exchange.name, exchange.type, { durable: false })
      await this._channel.publish(exchange.name, '', Buffer.from(messageString))
      return message
    } catch (error) {
      console.log('Error on Publish Message of Message Broker on Uploader')
    }
  }

  async consumeMessage (exchange: TExchange, action: (message: Record<string, unknown>) => Promise<Record<string, unknown>>) {
    try {
      await this._channel.assertExchange(exchange.name, exchange.type, { durable: false })
      const assertQueue = await this._channel.assertQueue('', { exclusive: true })

      await this._channel.bindQueue(assertQueue.queue, exchange.name, '')

      await this._channel.consume(assertQueue.queue, async (message) => {
        if (message?.content) {
          const messageContent = message.content.toString()
          await action(JSON.parse(messageContent))
        }
      }, { noAck: true })
    } catch (error) {
      const httpError = new HttpError(400, 'Error on conection of Message Broker Connection on Uploader')
      errorHandlerRabbitMQ(httpError)
    }
  }
}
