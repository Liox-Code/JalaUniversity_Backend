import PhotoEntity from '../entities/photo.entity'

export interface IPhotoRepository {
  create: (photo: PhotoEntity)=> number
  read: ()=> PhotoEntity[]
  update: (id: number, photo: PhotoEntity)=> PhotoEntity
  delete: (id: number)=> PhotoEntity
}
