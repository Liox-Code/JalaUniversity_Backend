import { AppDataSource } from './database/dataSource'
import { MessageBroker } from './infrastructure/messageBroker/messageBroker'
import App from './app'
import MessageBrokerManager from './infrastructure/messageBroker/messageBroker.manager'

(async () => {
  try {
    await AppDataSource.initialize()
    const messageBroker = await new MessageBroker()
    await messageBroker.connect()
    await new MessageBrokerManager()
    const app = await new App()
    await app.initConfig()
    await app.build()
    await app.listen()
    console.log('app')
  } catch (err) {
    console.log(err)
  }
})()
