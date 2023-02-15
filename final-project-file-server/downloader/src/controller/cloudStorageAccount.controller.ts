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
    this.router.post('/', this.createCloudStorageAccount)
    this.router.get('/', this.readCloudStorageAccounts)
    this.router.get('/:id', this.readCloudStorageAccount)
    this.router.delete('/:id', this.deleteCloudStorageAccount)
    this.router.put('/:id', this.updateCloudStorageAccount)
  }

  private createCloudStorageAccount = async (req: Request, res: Response) => {
    const cloudStorageAccount = req.body as CloudStorageAccountDTO

    if (!cloudStorageAccount) return res.status(400).json({ error: 'Body parameter are needed' })

    const response = await this.cloudStorageAccountService.createCloudStorageAccount(cloudStorageAccount)
    res.status(200).json({ message: `CloudStorageAccount Created: ${response}` })
  }

  private readCloudStorageAccounts = async (req: Request, res: Response) => {
    const response = await this.cloudStorageAccountService.readCloudStorageAccounts()
    res.status(200).json({ message: response })
  }

  private readCloudStorageAccount = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }

    if (!id) return res.status(400).json({ error: 'It is needed a parameter' })
    if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid parameter' })

    const response = await this.cloudStorageAccountService.readCloudStorageAccount(id)
    res.status(200).json({ message: response })
  }

  private updateCloudStorageAccount = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const cloudStorageAccount = req.body as CloudStorageAccountDTO

    if (!id) return res.status(400).json({ error: 'It is needed a parameter' })
    if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid parameter' })

    const response = await this.cloudStorageAccountService.updateCloudStorageAccount(id, cloudStorageAccount)
    res.status(200).json({ message: `CloudStorageAccount Updated: ${response}` })
  }

  private deleteCloudStorageAccount = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }

    if (!id) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.cloudStorageAccountService.deleteCloudStorageAccount(id)

    if (!response) return res.status(409).json({ error: 'Unable to delete the resource' })

    res.status(200).json({ message: `Sucesfully deleted: ${response}` })
  }
}

export default new CloudStorageAccountController().router
