import { Router, Request, Response } from 'express'
import { FileService } from '../services/file.service'
import multer from 'multer'
import { GoogleAPIService } from '../services/drive'

class FileController {
  public router: Router
  private fileService
  private cloudStorageService
  private upload

  constructor () {
    this.fileService = new FileService()
    this.cloudStorageService = new GoogleAPIService()
    this.upload = multer({ storage: multer.memoryStorage() })
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.post('/', this.upload.single('file'), this.createFile)
    this.router.get('/', this.readFiles)
    this.router.get('/:id', this.readFile)
    this.router.put('/:id', this.upload.single('file'), this.updateFile)
    this.router.delete('/:id', this.deleteFile)

    this.router.get('/drive', this.readAllFilesCloudStorage)
    this.router.post('/drive', this.upload.single('file'), this.uploadFileCloudStorage)
    this.router.get('/drive/:id', this.readFileCloudStorage)
  }

  private createFile = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File

    const response = await this.fileService.createFile(file)

    res.status(200).json({ message: response })
  }

  private readFiles = async (req: Request, res: Response) => {
    try {
      const response = await this.fileService.readFiles()
      res.status(200).json({ message: response })
    } catch (error) {
      console.error(error)
    }
  }

  private readFile = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    try {
      const response = await this.fileService.readFileById(id)
      res.status(200).json({ message: response })
    } catch (error) {
      console.error(error)
    }
  }

  private updateFile = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const file = req.file as Express.Multer.File

    const response = await this.fileService.updateFile(id, file)

    res.status(200).json({ message: response })
  }

  private deleteFile = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }

    const response = await this.fileService.deleteFile(id)

    res.status(200).json({ message: response })
  }

  private readFileCloudStorage = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }

    const response = await this.cloudStorageService.readFile(id)
    res.json({ message: response })
  }

  private readAllFilesCloudStorage = async (req: Request, res: Response) => {
    const { pageSize, pageToken } = req.body as { pageSize: number, pageToken?: string }
    const response = await this.cloudStorageService.readFiles(pageSize, pageToken)
    res.json({ message: response })
  }

  private uploadFileCloudStorage = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File

    const response = await this.cloudStorageService.uploadFile(file)
    res.json({ message: response })
  }
}

export default new FileController().router
