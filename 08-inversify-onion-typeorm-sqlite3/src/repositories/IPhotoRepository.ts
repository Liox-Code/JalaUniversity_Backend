import { IPhotoEntity } from './IPhotoEntity'

export interface IPhotoRepository {
  initilizeDb: ()=> Promise<void>
  create: (photo: IPhotoEntity)=> Promise<void>
  read: (id: number)=> Promise<void>
  update: (id: number, photo: IPhotoEntity)=> Promise<void>
  delete: (id: number)=> Promise<void>
}
