import { IFileRepository } from '../types/IFileRepository.type'
import { FileRepository } from '../database/repositories/file.repository'
import { FileDTO } from '../dto/file.dto'

export class FileService {
  private fileRepository: IFileRepository

  constructor () {
    this.fileRepository = new FileRepository()
  }

  createFile = async (file: FileDTO) => {
    return await this.fileRepository.createFile(file)
  }

  readFiles = async () => {
    return await this.fileRepository.readFiles()
  }

  readFileById = async (fileId: string) => {
    return await this.fileRepository.readFileById(fileId)
  }

  updateFile = async (fileId: string, file: FileDTO) => {
    return await this.fileRepository.updateFile(fileId, file)
  }

  deleteFile = async (fileId: string) => {
    return await this.fileRepository.deleteFile(fileId)
  }
}
