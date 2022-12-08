import { IPhotoRepository } from '../repositories/IPhoto.repository'
import { inject, injectable } from 'inversify'
import { TYPES } from '../type.core'
import PhotoEntity from '../entities/photo.entity'
import 'reflect-metadata'

@injectable()
export class PhotoService {
  private photo: IPhotoRepository

  constructor (@inject(TYPES.Photo) photo:IPhotoRepository) {
    this.photo = photo
  }

  read (): PhotoEntity[] {
    return this.photo.read()
  }

  create (photo: PhotoEntity): number {
    return this.photo.create(photo)
  }

  update (id: number, photo: PhotoEntity): PhotoEntity {
    return this.photo.update(id, photo)
  }

  delete (id: number): PhotoEntity {
    return this.photo.delete(id)
  }
}
