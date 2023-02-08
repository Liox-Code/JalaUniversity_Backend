import { Router, Request, Response } from 'express'
import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { CloudStorageAccountService } from '../services/cloudStorageAccount.service'

class CloudStorageAccountController {
  public router: Router
  private cloudStorageAccountService

  constructor () {
    this.cloudStorageAccountService = new CloudStorageAccountService()
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.get('/', this.readCloudStorageAccount)
    this.router.post('/', this.createCloudStorageAccount)
    this.router.delete('/', this.deleteCloudStorageAccount)
    this.router.put('/', this.updateCloudStorageAccount)
  }

  private createCloudStorageAccount = async (req: Request, res: Response) => {
    const { cloudStorageAccountId } = req.query

    if (!cloudStorageAccountId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof cloudStorageAccountId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.cloudStorageAccountService.createCloudStorageAccount(new CloudStorageAccountDTO(cloudStorageAccountId, 'email', 123))
    res.status(200).json({ message: `CloudStorageAccount Created: ${response}` })
  }

  private readCloudStorageAccount = async (req: Request, res: Response) => {
    const { cloudStorageAccountId } = req.query

    if (!cloudStorageAccountId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof cloudStorageAccountId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.cloudStorageAccountService.readCloudStorageAccount(cloudStorageAccountId)
    res.status(200).json({ message: response })
  }

  private updateCloudStorageAccount = async (req: Request, res: Response) => {
    const { cloudStorageAccountId } = req.query

    if (!cloudStorageAccountId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof cloudStorageAccountId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.cloudStorageAccountService.updateCloudStorageAccount(new CloudStorageAccountDTO(cloudStorageAccountId, 'emailUpdated', 123456))
    res.status(200).json({ message: `CloudStorageAccount Updated: ${response}` })
  }

  private deleteCloudStorageAccount = async (req: Request, res: Response) => {
    const { cloudStorageAccountId } = req.query

    if (!cloudStorageAccountId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof cloudStorageAccountId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.cloudStorageAccountService.deleteCloudStorageAccount(cloudStorageAccountId)

    if (!response) return res.status(409).json({ error: 'Unable to delete the resource' })

    res.status(200).json({ message: `Sucesfully deleted: ${cloudStorageAccountId}` })
  }
}

export default new CloudStorageAccountController().router
