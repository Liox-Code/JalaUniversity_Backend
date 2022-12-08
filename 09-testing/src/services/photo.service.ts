import { IPhotoRepository } from '../repositories/IPhoto'
import { inject, injectable } from 'inversify'
import { TYPES } from '../type.core'
import 'reflect-metadata'

@injectable()
export class PhotoService {
  private photo: IPhotoRepository

  constructor (@inject(TYPES.Photo) photo:IPhotoRepository) {
    this.photo = photo
  }

  create () {
    return this.photo.create()
  }

  read () {
    return this.photo.read()
  }

  update () {
    return this.photo.update()
  }

  delete () {
    return this.photo.delete()
  }
}
