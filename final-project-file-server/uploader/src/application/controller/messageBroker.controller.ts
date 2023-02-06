import { Router, Request, Response } from 'express'
import { FileService } from '../../core/services/file.service'
import MessageBroker from '../../messageBroker/messageBroker'

class MessageBrokerController {
  public router: Router
  uriService: FileService = new FileService()
  private messageBroker: MessageBroker

  constructor () {
    this.router = Router()
    this.initRoutes()

    this.messageBroker = new MessageBroker()
    console.log(this.messageBroker)
  }

  private initRoutes () {
    this.router.post('/', this.sendData)
  }

  private async sendData (req: Request, res: Response) {
    console.log('Controller post testing message broker')
    // try {
    //   const data = 'await req.body'

    //   await this.messageBroker.channel.sendToQueue(
    //     'calculate',
    //     Buffer.from(
    //       data
    //     )
    //   )

    //   res.send('Calculation order submitted')
    // } catch (error) {
    //   throw new Error(`Error: ${error}`)
    // }
  }
}

export default new MessageBrokerController().router
