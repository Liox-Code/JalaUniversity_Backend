import { IFileRepository } from '../types/IFile.type'
import { FileRepository } from '../database/repositories/file.repository'

export class FileService {
  private file: IFileRepository

  constructor () {
    this.file = new FileRepository()
  }

  createFile = async (file: Express.Multer.File) => {
    return await this.file.createFile(file)
  }

  readFiles = async () => {
    return await this.file.readFiles()
  }

  readFileById = async (fileId: string) => {
    return await this.file.readFileById(fileId)
  }

  updateFile = async (fileId: string, file: Express.Multer.File) => {
    return await this.file.updateFile(fileId, file)
  }

  deleteFile = async (fileId: string) => {
    return await this.file.deleteFile(fileId)
  }
}
