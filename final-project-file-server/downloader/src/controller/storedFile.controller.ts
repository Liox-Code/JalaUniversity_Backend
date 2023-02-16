import { Router, Request, Response, NextFunction } from 'express'
import { StoredFileDTO } from '../dto/storedFile.dto'
import { StoredFileService } from '../services/storedFile.service'
import { HttpError } from '../middlewares/errorHandler'

class StoredFileController {
  public router: Router
  storedFileService: StoredFileService

  constructor () {
    this.router = Router()
    this.initRoutes()
    this.storedFileService = new StoredFileService()
  }

  private initRoutes () {
    this.router.post('/', this.createStoredFile)
    this.router.get('/', this.readAllStoredFiles)
    this.router.get('/:id', this.readStoredFile)
    this.router.put('/:id', this.updateStoredFile)
    this.router.delete('/:id', this.deleteStoredFile)
  }

  private createStoredFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileId, driveId, webViewLink, webContentLink } = req.body
      const storeFile = new StoredFileDTO(fileId, driveId, webViewLink, webContentLink)
      const response = await this.storedFileService.createStoredFile(storeFile)
      res.send(`StoredFile Created: ${response}`)
    } catch (error) {
      next(new HttpError(500, error.message))
    }
  }

  private readAllStoredFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.storedFileService.readAllStoredFiles()
      res.send(response)
    } catch (error) {
      next(new HttpError(500, error.message))
    }
  }

  private readStoredFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      if (!id) throw new HttpError(400, 'It is needed a query parameter')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid query parameter')

      const response = await this.storedFileService.readStoredFile(id)

      res.send(response)
    } catch (error) {
      next(error)
    }
  }

  private updateStoredFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { fileId, driveId, webViewLink, webContentLink } = req.body

      if (!id) throw new HttpError(400, 'It is needed a query parameter')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid query parameter')

      const storeFile = new StoredFileDTO(fileId, driveId, webViewLink, webContentLink)

      const response = await this.storedFileService.updateStoredFile(id, storeFile)

      res.send(`StoredFile Updated: ${response}`)
    } catch (error) {
      next(error)
    }
  }

  private deleteStoredFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      if (!id) throw new HttpError(400, 'It is needed a query parameter')
      if (typeof id !== 'string') throw new HttpError(400, 'Invalid query parameter')
      const response = await this.storedFileService.deleteStoredFile(id)
      if (!response) res.send('Error Erasing')
      res.send(`Sucesfully deleted: ${id}`)
    } catch (error) {
      next(new HttpError(500, 'Error Erasing'))
    }
  }
}

export default new StoredFileController().router
