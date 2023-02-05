import { Router, Request, Response } from 'express'
import { FileService } from '../../core/services/file.service'

class FileController {
  public router: Router
  fileService: FileService = new FileService()

  constructor () {
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.get('/', this.getFiles)
    this.router.post('/', this.uploadFile)
  }

  private async getFiles (req: Request, res: Response) {
    res.send('You sent: File')
  }

  private uploadFile (req: Request, res: Response) {
    res.send('You sent: upload File')
  }
}

export default new FileController().router
