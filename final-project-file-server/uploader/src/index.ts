import { AppDataSource } from './database/dataSource'
import App from './app'
import { MessageBroker } from './infrastructure/messageBroker/messageBroker'
import MessageBrokerManager from './infrastructure/messageBroker/messageBroker.manager'

(async () => {
  try {
    await AppDataSource.initialize()
    const messageBroker = await new MessageBroker()
    await messageBroker.connect()
    await new MessageBrokerManager()
    const app = new App()
    app.initConfig()
    app.build()
    app.listen()
  } catch (err) {
    throw new Error(`${err}`)
  }
})()
