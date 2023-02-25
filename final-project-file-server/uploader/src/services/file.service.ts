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

  readFileById = async (id: string) => {
    return await this.file.readFileById(id)
  }

  updateFile = async (id: string, file: Express.Multer.File) => {
    const fileDTO = await this.readFileById(id)
    return await this.file.updateFile(fileDTO, file)
  }

  updateFileStatus = async (fileId: string, status: string) => {
    return await this.file.updateFileStatus(fileId, status)
  }

  deleteFile = async (id: string) => {
    const fileDTO = await this.readFileById(id)
    return await this.file.deleteFile(fileDTO)
  }
}
