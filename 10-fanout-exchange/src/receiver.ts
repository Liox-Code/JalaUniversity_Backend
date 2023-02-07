import amqplib from 'amqplib'

const receive = async () => {
  const exchangeName = 'fanoutExchange'
  const amqpServer = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest'
  }

  try {
    const connection = await amqplib.connect(amqpServer)
    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName, 'fanout', { durable: false })
    const queue = await channel.assertQueue('', { exclusive: true })

    console.log(`Waiting for messages in queue: ${queue.queue}`)

    channel.bindQueue(queue.queue, exchangeName, '')
    channel.consume(queue.queue, (message) => {
      if (message?.content) console.log(`The message is: ${message.content.toString()}`)
    }, { noAck: true })
  } catch (error) {
    throw new Error('Error receiber')
  }
}

receive()
