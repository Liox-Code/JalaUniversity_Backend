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

    if (typeof cloudStorageAccountId !== 'string') throw new Error('cloudStorageAccountId not a string type error')

    const response = await this.cloudStorageAccountService.createCloudStorageAccount(new CloudStorageAccountDTO(cloudStorageAccountId, 'email', 123))
    res.send(`CloudStorageAccount Created: ${response}`)
  }

  private readCloudStorageAccount = async (req: Request, res: Response) => {
    const { cloudStorageAccountId } = req.query

    if (typeof cloudStorageAccountId !== 'string') throw new Error('cloudStorageAccountId not a string type error')

    const response = await this.cloudStorageAccountService.readCloudStorageAccount(cloudStorageAccountId)
    res.send(response)
  }

  private updateCloudStorageAccount = async (req: Request, res: Response) => {
    const { cloudStorageAccountId } = req.query

    if (typeof cloudStorageAccountId !== 'string') throw new Error('cloudStorageAccountId not a string type error')

    const response = await this.cloudStorageAccountService.updateCloudStorageAccount(new CloudStorageAccountDTO(cloudStorageAccountId, 'emailUpdated', 123456))
    res.send(`CloudStorageAccount Updated: ${response}`)
  }

  private deleteCloudStorageAccount = async (req: Request, res: Response) => {
    const { cloudStorageAccountId } = req.query

    if (typeof cloudStorageAccountId !== 'string') throw new Error('cloudStorageAccountId not a string type error')

    const response = await this.cloudStorageAccountService.deleteCloudStorageAccount(cloudStorageAccountId)

    if (!response) res.send('Error Erasing')

    res.send(`Sucesfully deleted: ${cloudStorageAccountId}`)
  }
}

export default new CloudStorageAccountController().router
