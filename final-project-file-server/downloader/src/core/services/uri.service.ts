import { UriTypeOrmRepository } from '../../infraestructure/uri.typeorm.repository'
import { IUriRepository } from '../repositories/IUri.repository'

export class UriService {
  private uri: IUriRepository

  constructor () {
    this.uri = new UriTypeOrmRepository()
  }

  createUri () {
    console.log('create uri')
  }

  readUri () {
    console.log('read uri')
  }

  updateUri () {
    console.log('update uri')
  }

  eraseUri () {
    console.log('erase uri')
  }
}
