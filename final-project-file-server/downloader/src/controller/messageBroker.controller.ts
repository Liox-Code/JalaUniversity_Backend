import { Router, Request, Response } from 'express'
import { MessageBrokerService } from '../services/messageBroker.service'

class MessageBrokerController {
  public router: Router
  messageBrokerService: MessageBrokerService

  constructor () {
    this.router = Router()
    this.initRoutes()

    this.messageBrokerService = new MessageBrokerService()
  }

  private initRoutes () {
    this.router.post('/', this.publishMessage)
    this.router.get('/', this.consumeMessage)
  }

  private publishMessage = async (req: Request, res: Response) => {
    const { message } = req.query

    if (typeof message !== 'string') throw new Error('message not a string type error')

    const response = await this.messageBrokerService.publishMessage(message)
    res.json(response)
  }

  private consumeMessage = async (req: Request, res: Response) => {
    const response = await this.messageBrokerService.consumeMessage()
    res.json(response)
  }
}

export default new MessageBrokerController().router
