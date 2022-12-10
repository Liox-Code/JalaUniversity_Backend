import { container } from './inversify.config'
import { PhotoService } from './services/photo.service'
import { TYPES } from './type.core'
import { IPhotoEntity } from './repositories/IPhotoEntity'
import 'reflect-metadata'

class Test {
  async initializeDb () {
    const PhotoObj = await container.get<PhotoService>(TYPES.Photo)
    await PhotoObj.initilizeDb()
    const photo2:IPhotoEntity = {
      photoId: 2,
      photoName: 'Photo 2',
      photoDescription: 'Second Photo',
      photoFileName: 'Photo2.jpg'
    }
    console.log(await PhotoObj.create(photo2))
    const photo3:IPhotoEntity = {
      photoId: 3,
      photoName: 'Photo 3',
      photoDescription: 'Third Photo',
      photoFileName: 'Photo3.jpg'
    }
    console.log(await PhotoObj.create(photo3))
    const photo4:IPhotoEntity = {
      photoId: 4,
      photoName: 'Photo 4',
      photoDescription: 'Fourth Photo',
      photoFileName: 'Photo4.jpg'
    }
    console.log(await PhotoObj.create(photo4))

    console.log(await PhotoObj.read(2))

    photo3.photoDescription = 'UPDATED'
    console.log(await PhotoObj.update(3, photo3))

    // await PhotoObj.delete(1)
    // await PhotoObj.delete(2)
    // await PhotoObj.delete(3)
    await PhotoObj.delete(4)
  }
}

new Test().initializeDb()
