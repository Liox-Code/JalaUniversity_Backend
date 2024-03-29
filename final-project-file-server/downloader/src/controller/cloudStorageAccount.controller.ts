import { Router, Request, Response, NextFunction } from 'express'
import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { CloudStorageAccountService } from '../services/cloudStorageAccount.service'
import { HttpError } from '../middlewares/errorHandler'

class CloudStorageAccountController {
  public router: Router
  private cloudStorageAccountService

  constructor () {
    this.cloudStorageAccountService = new CloudStorageAccountService()
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.post('/', this.createCloudStorageAccount)
    this.router.get('/', this.readCloudStorageAccounts)
    this.router.get('/:id', this.readCloudStorageAccount)
    this.router.delete('/:id', this.deleteCloudStorageAccount)
    this.router.put('/:id', this.updateCloudStorageAccount)
  }

  private createCloudStorageAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cloudStorageAccount = req.body as CloudStorageAccountDTO

      if (!cloudStorageAccount) throw new HttpError(400, 'Body parameters are needed')

      const response = await this.cloudStorageAccountService.createCloudStorageAccount(cloudStorageAccount)
      res.status(200).json({ message: `CloudStorageAccount Created: ${response}` })
    } catch (error) {
      next(error)
    }
  }

  private readCloudStorageAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.cloudStorageAccountService.readAllCloudStorageAccountStats()
      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private readCloudStorageAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }

      if (!id) throw new HttpError(400, 'Parameter is needed')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid parameter')

      const response = await this.cloudStorageAccountService.readCloudStorageAccountById(id)
      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private updateCloudStorageAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }
      const cloudStorageAccount = req.body as CloudStorageAccountDTO

      if (!id) throw new HttpError(400, 'Parameter is needed')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid parameter')

      const response = await this.cloudStorageAccountService.updateCloudStorageAccount(id, cloudStorageAccount)
      res.status(200).json({ message: `CloudStorageAccount Updated: ${response}` })
    } catch (error) {
      next(error)
    }
  }

  private deleteCloudStorageAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }

      if (!id) throw new HttpError(400, 'Query parameter is needed')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid query parameter')

      const response = await this.cloudStorageAccountService.deleteCloudStorageAccount(id)

      if (!response) throw new HttpError(409, 'Unable to delete the resource')

      res.status(200).json({ message: `Successfully deleted: ${response}` })
    } catch (error) {
      next(error)
    }
  }
}

export default new CloudStorageAccountController().router
