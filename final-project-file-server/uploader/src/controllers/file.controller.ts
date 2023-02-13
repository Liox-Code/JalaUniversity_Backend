import { Router, Request, Response } from 'express'
import { FileDTO } from '../dto/file.dto'
import { FileService } from '../services/file.service'
import multer from 'multer'

class FileController {
  public router: Router
  private fileService
  private upload

  constructor () {
    this.fileService = new FileService()
    this.upload = multer({ storage: multer.memoryStorage() })
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.get('/', this.readFile)
    this.router.post('/', this.createFile)
    this.router.delete('/', this.deleteFile)
    this.router.put('/', this.updateFile)

    this.router.post('/file', this.upload.single('file'), this.saveFile)
    this.router.get('/:id', this.getFile)
  }

  private saveFile = async (req: Request, res: Response) => {
    const { fileId, status } = req.body as { fileId: string, status: string }
    const file = req.file as Express.Multer.File

    const response = await this.fileService.saveFile(fileId, status, file)

    res.status(200).json({ message: response })
  }

  private getFile = async (req: Request, res: Response) => {
    try {
      const stream = await this.fileService.getFile(req.params.id)
      // res.set('Content-Type', stream.file.contentType)
      // res.set('Content-Length', stream.file.length)
      // res.set('Content-Disposition', `attachment; filename=${stream.file.filename}`)
      stream.pipe(res)

      console.log(stream)
      // res.status(200).json({ message: stream })
    } catch (error) {
      console.error(error)
      // res.status(500).send(error.message)
    }
  }

  private createFile = async (req: Request, res: Response) => {
    const { fileId } = req.query

    if (!fileId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof fileId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.fileService.createFile(new FileDTO(fileId, 'fileName', 'size', 'status'))
    res.status(200).json({ message: `File Created: ${response}` })
  }

  private readFile = async (req: Request, res: Response) => {
    const { fileId } = req.query

    if (!fileId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof fileId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.fileService.readFile(fileId)
    res.status(200).json({ message: response })
  }

  private updateFile = async (req: Request, res: Response) => {
    const { fileId } = req.query

    if (!fileId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof fileId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.fileService.updateFile(new FileDTO(fileId, 'fileNameUpdated', 'sizeUpdated', 'statusUpdated'))
    res.status(200).json({ message: `File Updated: ${response}` })
  }

  private deleteFile = async (req: Request, res: Response) => {
    const { fileId } = req.query

    if (!fileId) return res.status(400).json({ error: 'It is needed a query parameter' })
    if (typeof fileId !== 'string') return res.status(400).json({ error: 'Invalid query parameter' })

    const response = await this.fileService.deleteFile(fileId)

    if (!response) return res.status(409).json({ error: 'Unable to delete the resource' })

    res.status(200).json({ message: `Sucesfully deleted: ${fileId}` })
  }
}

export default new FileController().router
