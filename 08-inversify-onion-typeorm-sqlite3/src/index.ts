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
      id: 2,
      name: 'Photo 2',
      description: 'Second Photo',
      fileName: 'Photo2.jpg'
    }
    await PhotoObj.create(photo2)
    const photo3:IPhotoEntity = {
      id: 3,
      name: 'Photo 3',
      description: 'Third Photo',
      fileName: 'Photo3.jpg'
    }
    await PhotoObj.create(photo3)
    // const photo4:IPhotoEntity = {
    //   id: 4,
    //   name: 'Photo 4',
    //   description: 'Fourth Photo',
    //   fileName: 'Photo4.jpg'
    // }
    // await PhotoObj.create(photo4)

    await PhotoObj.read(2)

    photo3.description = 'UPDATED'
    await PhotoObj.update(3, photo3)

    // PhotoObj.delete(1)
    // PhotoObj.delete(2)
    // PhotoObj.delete(3)
    PhotoObj.delete(4)
  }
}

new Test().initializeDb()
