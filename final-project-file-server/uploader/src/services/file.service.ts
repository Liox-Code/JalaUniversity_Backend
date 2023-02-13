import { IFileRepository } from '../types/IFile.type'
import { FileRepository } from '../database/repositories/file.repository'
import { FileDTO } from '../dto/file.dto'

export class FileService {
  private file: IFileRepository

  constructor () {
    this.file = new FileRepository()
  }

  createFile = async (file: FileDTO) => {
    return this.file.createFile(file)
  }

  readFile = async (fileId: string) => {
    return await this.file.readFile(fileId)
  }

  updateFile = async (file: FileDTO) => {
    return await this.file.updateFile(file)
  }

  deleteFile = async (fileId: string) => {
    return await this.file.deleteFile(fileId)
  }

  saveFile = async (fileId: string, status: string, file: Express.Multer.File) => {
    return await this.file.saveFile(fileId, status, file)
  }

  getFile = async (fileId: string) => {
    return await this.file.getFile(fileId)
  }
}
