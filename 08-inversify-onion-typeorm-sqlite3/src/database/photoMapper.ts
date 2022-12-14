import { IPhotoEntity } from '../repositories/IPhotoEntity'
import PhotoDataEntity from './photoDataEntity'

export class PhotoMapper {
  static toEntity (photo: PhotoDataEntity): IPhotoEntity {
    const photoEntity: IPhotoEntity = {
      photoId: photo.id,
      photoName: photo.name,
      photoDescription: photo.description,
      photoFileName: photo.fileName
    }

    return photoEntity
  }

  static toDataEntity (photo: IPhotoEntity): PhotoDataEntity {
    const photoEntity: PhotoDataEntity = {
      id: photo.photoId,
      name: photo.photoName,
      description: photo.photoDescription,
      fileName: photo.photoFileName
    }

    return photoEntity
  }
}
