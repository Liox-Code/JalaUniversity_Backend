import { Router, Request, Response } from 'express'
import MessageBroker from '../../messageBroker/messageBroker'

class MessageBrokerController {
  public router: Router
  private messageBroker: MessageBroker

  constructor () {
    this.router = Router()
    this.initRoutes()

    this.messageBroker = new MessageBroker()
    console.log(this.messageBroker)
  }

  private initRoutes () {
    this.router.post('/', this.sendCalculationOrder)
  }

  private async sendCalculationOrder (req: Request, res: Response) {
    console.log('Controller post testing message broker')
  }
}

export default new MessageBrokerController().router
