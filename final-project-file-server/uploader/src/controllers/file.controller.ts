import { Router, Request, Response } from 'express'
import { FileDTO } from '../dto/file.dto'
import { FileService } from '../services/file.service'

class FileController {
  public router: Router
  private fileService

  constructor () {
    this.fileService = new FileService()
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes () {
    this.router.get('/', this.readFile)
    this.router.post('/', this.createFile)
    this.router.delete('/', this.deleteFile)
    this.router.put('/', this.updateFile)
  }

  private createFile = async (req: Request, res: Response) => {
    const { fileId } = req.query

    if (typeof fileId !== 'string') throw new Error('fileId not a string type error')

    const response = await this.fileService.createFile(new FileDTO(fileId, 'fileName', 'size', 'status'))
    res.send(`File Created: ${response}`)
  }

  private readFile = async (req: Request, res: Response) => {
    const { fileId } = req.query

    if (typeof fileId !== 'string') throw new Error('fileId not a string type error')

    const response = await this.fileService.readFile(fileId)
    res.send(response)
  }

  private updateFile = async (req: Request, res: Response) => {
    const { fileId } = req.query

    if (typeof fileId !== 'string') throw new Error('fileId not a string type error')

    const response = await this.fileService.updateFile(new FileDTO(fileId, 'fileNameUpdated', 'sizeUpdated', 'statusUpdated'))
    res.send(`File Updated: ${response}`)
  }

  private deleteFile = async (req: Request, res: Response) => {
    const { fileId } = req.query

    if (typeof fileId !== 'string') throw new Error('fileId not a string type error')

    const response = await this.fileService.deleteFile(fileId)

    if (!response) res.send('Error Erasing')

    res.send(`Sucesfully deleted: ${fileId}`)
  }
}

export default new FileController().router
