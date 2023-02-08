import { AppDataSource } from './database/dataSource'
import App from './app'
import MessageBroker from './infrastructure/messageBroker/messageBroker'

(async () => {
  try {
    await AppDataSource.initialize()
    const messageBroker = await new MessageBroker()
    await messageBroker.connect()
    const app = new App()
    app.initConfig()
    app.build()
    app.listen()
  } catch (err) {
    console.log(err)
  }
})()
