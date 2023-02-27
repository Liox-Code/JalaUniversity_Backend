import { Router, Request, Response, NextFunction } from 'express'
import { FileService } from '../services/file.service'
import { StoreFileService } from '../services/storeFile.service'
import multer from 'multer'
import { InfluxDBManager } from '../infrastructure/influxDB/influxDB.manager'

class FileController {
  public router: Router
  private fileService
  private storeFileService
  // private cloudStorageService
  private upload
  influxDBManager: InfluxDBManager

  constructor () {
    this.fileService = new FileService()
    this.storeFileService = new StoreFileService()
    this.influxDBManager = new InfluxDBManager()
    // this.cloudStorageService = new GoogleAPIService()
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
  }

  private createFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file as Express.Multer.File
      const response = await this.storeFileService.storeFile(file)
      await this.influxDBManager.fileSize(response)
      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private readFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.fileService.readFiles()
      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private readFile = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string }
    try {
      const response = await this.fileService.readFileById(id)
      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private updateFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }
      const file = req.file as Express.Multer.File

      const response = await this.fileService.updateFile(id, file)

      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }

      const response = await this.fileService.deleteFile(id)

      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }
}

export default new FileController().router
