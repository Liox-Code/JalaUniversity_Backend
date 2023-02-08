import amqplib, { Channel, Connection } from 'amqplib'

class MessageBroker {
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

      await this._channel.assertQueue('calculate', { durable: false })
      await this._channel.sendToQueue('calculate', Buffer.from('Hello from Uploader'))
    } catch (error) {
      throw new Error('Error on conection of Message Broker Connection on Uploader')
    }
  }
}

export default MessageBroker
