import { IFileRepository } from '../core/repositories/IFile.repository'

export class FileTypeOrmRepository implements IFileRepository {
  async createFile () {
    console.log('create File')
  }

  async readFile () {
    console.log('read File')
  }

  async updateFile () {
    console.log('update File')
  }

  async eraseFile () {
    console.log('erase File')
  }
}
