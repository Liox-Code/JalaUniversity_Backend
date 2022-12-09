import { IPhotoRepository } from '../repositories/IPhotoRepository'
import { inject, injectable } from 'inversify'
import { TYPES } from '../type.core'
import { IPhotoEntity } from '../repositories/IPhotoEntity'

@injectable()
export class PhotoService {
  private photo: IPhotoRepository

  constructor (@inject(TYPES.Photo) photo:IPhotoRepository) {
    this.photo = photo
  }

  async initilizeDb (): Promise<void> {
    await this.photo.initilizeDb()
  }

  async read (id: number): Promise<void> {
    await this.photo.read(id)
  }

  async create (photo: IPhotoEntity): Promise<void> {
    await this.photo.create(photo)
  }

  async update (id: number, photo: IPhotoEntity): Promise<void> {
    await this.photo.update(id, photo)
  }

  async delete (id: number): Promise<void> {
    await this.photo.delete(id)
  }
}
