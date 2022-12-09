import { IPhotoRepository } from '../repositories/IPhotoRepository'
import { inject, injectable } from 'inversify'
import { TYPES } from '../type.core'
import { IPhotoEntity } from '../repositories/IPhotoEntity'
import 'reflect-metadata'

@injectable()
export class PhotoService {
  private photo: IPhotoRepository

  constructor (@inject(TYPES.Photo) photo:IPhotoRepository) {
    this.photo = photo
  }

  read (id: number): Promise<IPhotoEntity> {
    return this.photo.read(id)
  }

  create (photo: IPhotoEntity): Promise<IPhotoEntity> {
    return this.photo.create(photo)
  }

  update (id: number, photo: IPhotoEntity): Promise<IPhotoEntity> {
    return this.photo.update(id, photo)
  }

  delete (id: number): void {
    return this.photo.delete(id)
  }
}
