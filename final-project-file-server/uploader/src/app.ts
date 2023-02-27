import express from 'express'
import FileController from './controllers/file.controller'
import CloudStorageAccountController from './controllers/cloudStorageAccount.controller'
import MessageBrokerController from './controllers/messageBroker.controller'
import { errorHandler } from './middlewares/errorHandler'

class App {
  public port: number
  private app: express.Application

  constructor () {
    this.port = 8891
    this.app = express()
  }

  public initConfig () {
    this.app.use(express.json({ limit: '5mb' }))
    this.app.use(errorHandler)
  }

  public build () {
    this.app.use('/file', FileController)
    this.app.use('/cloud-storage-account', CloudStorageAccountController)
    this.app.use('/messageBroker', MessageBrokerController)
  }

  public listen () {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

export default App
