import { container } from './inversify.config'
import { PhotoService } from './services/photoService'
import { TYPES } from './type.core'
import { IPhotoEntity } from './repositories/IPhotoEntity'
import 'reflect-metadata'

class Test {
  async initializeDb () {
    const photosList: IPhotoEntity[] = [
      {
        photoId: 2,
        photoName: 'Photo 2',
        photoDescription: 'Second Photo',
        photoFileName: 'Photo2.jpg'
      },
      {
        photoId: 3,
        photoName: 'Photo 3',
        photoDescription: 'Third Photo',
        photoFileName: 'Photo3.jpg'
      },
      {
        photoId: 4,
        photoName: 'Photo 4',
        photoDescription: 'Fourth Photo',
        photoFileName: 'Photo4.jpg'
      }
    ]

    const PhotoObj = await container.get<PhotoService>(TYPES.Photo)
    await PhotoObj.initilizeDb()

    for await (const photoItem of photosList) {
      console.log('************************************************************************************************************')
      console.log('************************************************** CREATE **************************************************')
      console.log(await PhotoObj.create(photoItem))

      console.log('*************************************************** READ ***************************************************')
      const photoLoaded = await PhotoObj.read(photoItem.photoId)
      console.log(photoLoaded)

      console.log('************************************************** UPDATE **************************************************')
      photoLoaded.photoDescription = 'UPDATED'
      console.log(await PhotoObj.update(photoLoaded))

      console.log('************************************************** DELETE **************************************************')
      await PhotoObj.delete(photoItem.photoId)
      console.log('************************************************************************************************************')
    }
  }
}

new Test().initializeDb()
