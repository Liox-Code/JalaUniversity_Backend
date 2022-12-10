import { IPhotoEntity } from './IPhotoEntity'

export interface IPhotoRepository {
  initilizeDb: ()=> Promise<void>
  create: (photo: IPhotoEntity)=> Promise<IPhotoEntity>
  read: (id: number)=> Promise<IPhotoEntity>
  update: (id: number, photo: IPhotoEntity)=> Promise<IPhotoEntity>
  delete: (id: number)=> Promise<void>
}
