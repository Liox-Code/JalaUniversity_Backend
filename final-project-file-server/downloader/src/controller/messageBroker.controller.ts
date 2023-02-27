import { Router, Request, Response, NextFunction } from 'express'
import { MessageBrokerService } from '../services/messageBroker.service'
import { HttpError } from '../middlewares/errorHandler'

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

  private publishMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = req.params

      if (!message) {
        throw new HttpError(400, 'It is needed a param parameter')
      }

      if (typeof message !== 'string') {
        throw new HttpError(400, 'Invalid param parameter')
      }

      const response = await this.messageBrokerService.publishMessage(message)
      res.status(200).json({ message: `${response} published` })
    } catch (error) {
      next(error)
    }
  }

  private consumeMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = req.params
      if (!message) {
        throw new HttpError(400, 'It is needed a query parameter')
      }

      if (typeof message !== 'string') {
        throw new HttpError(400, 'Invalid query parameter')
      }
      const response = await this.messageBrokerService.consumeMessage({ message })
      res.status(200).json({ message: 'consumer created' })
    } catch (error) {
      next(error)
    }
  }
}

export default new MessageBrokerController().router
