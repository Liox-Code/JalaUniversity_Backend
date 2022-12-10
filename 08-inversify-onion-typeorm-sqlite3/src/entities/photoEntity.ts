import { IPhotoEntity } from '../repositories/IPhotoEntity'

export class PhotoEntity implements IPhotoEntity {
  photoId: number
  photoName: string
  photoDescription: string
  photoFileName: string

  constructor (photoId:number, photoName:string, photoDescription:string, photoFileName:string) {
    this.photoId = photoId
    this.photoName = photoName
    this.photoDescription = photoDescription
    this.photoFileName = photoFileName
  }
}
