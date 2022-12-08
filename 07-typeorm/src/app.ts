import 'reflect-metadata'
import PhotoDataAccess from './data-access'
import { AppDataSource } from './data-source'
import Photo from './entities/photo'

class Test {
  async initializeDb () {
    await AppDataSource.initialize()

    const photo = new Photo()
    photo.description = 'test photo'
    photo.fileName = '12072022.jpg'
    photo.name = '12072022.jpg'

    const dataAccess = new PhotoDataAccess()
    await dataAccess.create(photo)

    const photoLoaded = await dataAccess.read(3)
    console.log(photoLoaded)

    if (photoLoaded) {
      photoLoaded.description = 'UPDATED'
      dataAccess.update(photoLoaded)
    }

    dataAccess.delete(3)
  }
}

new Test().initializeDb()
