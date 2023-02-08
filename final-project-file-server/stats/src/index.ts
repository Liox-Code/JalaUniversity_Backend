import App from './app'
import { MessageBroker } from './infrastructure/messageBroker/messageBroker'

(async () => {
  try {
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
