import { IPhotoEntity } from './IPhotoEntity'

export interface IPhotoRepository {
  create: (photo: IPhotoEntity)=> Promise<IPhotoEntity>
  read: (id: number)=> Promise<IPhotoEntity>
  update: (id: number, photo: IPhotoEntity)=> Promise<IPhotoEntity>
  delete: (id: number)=> void
}
