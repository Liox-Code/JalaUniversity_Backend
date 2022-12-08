import { IPhoto } from './interfaces/IPhoto'
import { inject, injectable } from 'inversify'
import { TYPES } from './type.core'
import 'reflect-metadata'

@injectable()
export class PhotoController {
  private photo: IPhoto

  constructor (@inject(TYPES.Photo) photo:IPhoto) {
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
