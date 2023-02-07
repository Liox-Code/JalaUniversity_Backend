import amqplib from 'amqplib'

const sendMessage = async () => {
  const exchangeName = 'fanoutExchange'
  const msg = 'Emmit message to all queue'
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
    await channel.publish(exchangeName, '', Buffer.from(msg))

    console.log(`Sent: ${msg}`)

    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500)
  } catch (error) {
    throw new Error('Error message fanout')
  }
}

sendMessage()
