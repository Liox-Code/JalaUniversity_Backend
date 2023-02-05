import express from 'express'
import FileController from './application/controller/file.controller'

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
    this.app.use('/file', FileController)
  }

  public listen () {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

export default App
