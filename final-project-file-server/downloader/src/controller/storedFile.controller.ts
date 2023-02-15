import { Router, Request, Response } from 'express'
import { StoredFileDTO } from '../dto/storedFile.dto'
import { StoredFileService } from '../services/storedFile.service'

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

  private createStoredFile = async (req: Request, res: Response) => {
    const { fileId, driveId, webViewLink, webContentLink } = req.body

    const storeFile = new StoredFileDTO(fileId, driveId, webViewLink, webContentLink)

    const response = await this.storedFileService.createStoredFile(storeFile)

    res.send(`StoredFile Created: ${response}`)
  }

  private readAllStoredFiles = async (req: Request, res: Response) => {
    const response = await this.storedFileService.readAllStoredFiles()
    res.send(response)
  }

  private readStoredFile = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.storedFileService.readStoredFile(id)

    res.send(response)
  }

  private updateStoredFile = async (req: Request, res: Response) => {
    const { id } = req.params
    const { fileId, driveId, webViewLink, webContentLink } = req.body

    if (!id) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const storeFile = new StoredFileDTO(fileId, driveId, webViewLink, webContentLink)

    const response = await this.storedFileService.updateStoredFile(id, storeFile)

    res.send(`StoredFile Updated: ${response}`)
  }

  private deleteStoredFile = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof id !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.storedFileService.deleteStoredFile(id)

    if (!response) res.send('Error Erasing')

    res.send(`Sucesfully deleted: ${id}`)
  }
}

export default new StoredFileController().router
