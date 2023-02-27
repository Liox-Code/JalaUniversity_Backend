import { Router, Request, Response, NextFunction } from 'express'
import { FileService } from '../services/file.service'
import { FileDTO } from '../dto/file.dto'

class FileController {
  public router: Router
  private fileService: FileService

  constructor () {
    this.fileService = new FileService()
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.post('/', this.createFile)
    this.router.get('/', this.readFiles)
    this.router.get('/:id', this.readFile)
    this.router.put('/:id', this.updateFile)
    this.router.delete('/:id', this.deleteFile)
  }

  private createFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.body as FileDTO
      const response = await this.fileService.createFile(file)

      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private readFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todayResponse = await this.fileService.readAllFileStats()
      res.status(200).json({
        message: todayResponse
      })
    } catch (error) {
      next(error)
    }
  }

  private readFile = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string }
    try {
      const response = await this.fileService.readFileStats(id)
      res.status(200).json({ message: response })
    } catch (error) {
      next(error)
    }
  }

  private updateFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string }
      const file = req.body as FileDTO

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
