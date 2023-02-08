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

    if (!message) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof message !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.messageBrokerService.publishMessage(message)
    res.status(200).json({ message: `${response} published` })
  }

  private consumeMessage = async (req: Request, res: Response) => {
    await this.messageBrokerService.consumeMessage()
    res.status(200).json({ message: 'consumer created' })
  }
}

export default new MessageBrokerController().router
