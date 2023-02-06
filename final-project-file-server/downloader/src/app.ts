import express from 'express'
import UriController from './application/controller/uri.controller'
import MessageBrokerController from './application/controller/messageBroker.controller'

class App {
  public port: number
  private app: express.Application

  constructor () {
    this.port = 8889
    this.app = express()
  }

  public initConfig () {
    this.app.use(express.json({ limit: '5mb' }))
  }

  public build () {
    this.app.use('/uri', UriController)
    this.app.use('/messageBroker', MessageBrokerController)
  }

  public listen () {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

export default App
