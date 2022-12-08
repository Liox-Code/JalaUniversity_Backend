import { injectable } from 'inversify'
import { IPhoto } from '../interfaces/IPhoto'
import 'reflect-metadata'

@injectable()
export class PhotoRepository {
  create (post: IPhoto) {
    //
  }

  findById (id: number) {
    //
  }

  update (id: number, post: IPhoto) {
    //
  }

  delete (id: number) {
    //
  }
}
