import amqplib, { Channel, Connection } from 'amqplib'
import { TExchange } from '../../types/infrastructure/exchanges.type'

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

  async publishMessage (exchange: TExchange, message: string) {
    try {
      await this._channel.assertExchange(exchange.name, exchange.type, { durable: false })
      await this._channel.publish(exchange.name, '', Buffer.from(message))
      return message
    } catch (error) {
      throw new Error('Error on Publish Message of Message Broker on Uploader')
    }
  }

  async consumeMessage (exchange: TExchange) {
    try {
      await this._channel.assertExchange(exchange.name, exchange.type, { durable: false })
      const assertQueue = await this._channel.assertQueue('', { exclusive: true })

      await this._channel.bindQueue(assertQueue.queue, exchange.name, '')

      await this._channel.consume(assertQueue.queue, (message) => {
        if (message?.content) console.log(`The message is: ${message.content.toString()}`)
      }, { noAck: true })
    } catch (error) {
      throw new Error('Error on Consume Message of Message Broker on Uploader')
    }
  }
}
