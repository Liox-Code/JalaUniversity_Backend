import { FileTypeOrmRepository } from '../../infraestructure/file.typeorm.repository'
import { IFileRepository } from '../repositories/IFile.repository'

export class FileService {
  private file: IFileRepository

  constructor () {
    this.file = new FileTypeOrmRepository()
  }

  async createFile (): Promise<void> {
    console.log('create File')
  }

  async readFile (): Promise<void> {
    console.log('read File')
  }

  async updateFile (): Promise<void> {
    console.log('update File')
  }
}
