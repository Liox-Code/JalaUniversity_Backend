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

      if (!cloudStorageAccount) throw new HttpError(400, 'Body parameter are needed')

      const response = await this.cloudStorageAccountService.createCloudStorageAccount(cloudStorageAccount)
      res.status(200).json({ message: `CloudStorageAccount Created: ${response}` })
    } catch (error) {
      next(error)
    }
  }

  private readCloudStorageAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.cloudStorageAccountService.readCloudStorageAccounts()
      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private readCloudStorageAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }

      if (!id) throw new HttpError(400, 'It is needed a parameter')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid parameter')

      const response = await this.cloudStorageAccountService.readCloudStorageAccount(id)
      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private updateCloudStorageAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }
      const cloudStorageAccount = req.body as CloudStorageAccountDTO

      if (!id) throw new HttpError(400, 'It is needed a parameter')
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

      if (!id) throw new HttpError(400, 'It is needed a query parameter')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid query parameter')

      const response = await this.cloudStorageAccountService.deleteCloudStorageAccount(id)

      res.status(200).json({ message: 'Sucesfully' })

      // if (!response) throw new HttpError(409, 'Unable to delete the resource')

      // res.status(200).json({ message: `Sucesfully deleted: ${response}` })
    } catch (error) {
      next(error)
    }
  }
}

export default new CloudStorageAccountController().router
