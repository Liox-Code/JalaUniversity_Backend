import { Router, Request, Response } from 'express'
import { UriService } from '../../core/services/uri.service'

class UriController {
  public router: Router
  uriService: UriService = new UriService()

  constructor () {
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.get('/', this.getUris)
    this.router.post('/', this.uploadUri)
  }

  private async getUris (req: Request, res: Response) {
    res.send('You sent: Uri')
  }

  private uploadUri (req: Request, res: Response) {
    res.send('You sent: upload Uri')
  }
}

export default new UriController().router
