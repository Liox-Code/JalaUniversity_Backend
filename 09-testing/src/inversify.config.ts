import { Container } from 'inversify'
import Photo from './entities/photo'
import { IPhotoRepository } from './repositories/IPhoto'
import { PhotoService } from './services/photo.service'
import { TYPES } from './type.core'

const container = new Container()

container.bind<IPhotoRepository>(TYPES.Photo).to(Photo)
container.bind<PhotoService>(TYPES.PhotoController).to(PhotoService)

export { container }
