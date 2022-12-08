import { IPhotoRepository } from '../repositories/IPhoto.repository'
import PhotoEntity from '../entities/photo.entity'
import { injectable } from 'inversify'

@injectable()
export class PhotoDataAccess implements IPhotoRepository {
  private photolList : PhotoEntity[] = [new PhotoEntity(1, 'Photo1', 'La primera photo', 'photo01.jpg'),
    new PhotoEntity(2, 'Photo2', 'La primera photo', 'photo02.jpg'),
    new PhotoEntity(3, 'Photo3', 'La primera photo', 'photo03.jpg')]

  read (): PhotoEntity[] {
    return this.photolList
  }

  create (photo: PhotoEntity): number {
    return this.photolList.push(photo)
  }

  update (id: number, photo: PhotoEntity): PhotoEntity {
    const targetIndex = this.photolList.findIndex(photo => photo.id === id)

    this.photolList[targetIndex].fileName = photo.fileName
    this.photolList[targetIndex].description = photo.description
    this.photolList[targetIndex].fileName = photo.fileName

    return this.photolList[targetIndex]
  }

  delete (id: number): PhotoEntity {
    const targetIndex = this.photolList.findIndex(photo => photo.id === id)
    if (targetIndex < -1) return null
    return this.photolList.splice(targetIndex, 1)[0]
  }
}
