import { Container } from 'inversify'
import Photo from './entities/photo'
import { IPhoto } from './interfaces/IPhoto'
import { PhotoController } from './photo.controller'
import { TYPES } from './type.core'

const container = new Container()

container.bind<IPhoto>(TYPES.Photo).to(Photo)
container.bind<PhotoController>(TYPES.PhotoController).to(PhotoController)

export { container }
