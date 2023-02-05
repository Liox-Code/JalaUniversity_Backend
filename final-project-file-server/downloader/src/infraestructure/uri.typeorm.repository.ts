import { IUriRepository } from '../core/repositories/IUri.repository'

export class UriTypeOrmRepository implements IUriRepository {
  async createUri () {
    console.log('create uri')
  }

  async readUri () {
    console.log('read uri')
  }

  async updateUri () {
    console.log('update uri')
  }

  async eraseUri () {
    console.log('erase uri')
  }
}
