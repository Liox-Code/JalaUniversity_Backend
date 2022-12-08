import { Container } from 'inversify'
import { PhotoDataAccess } from './database/photo'
import { IPhotoRepository } from './repositories/IPhoto.repository'
import { PhotoService } from './services/photo.service'
import { TYPES } from './type.core'

const container = new Container()

container.bind<IPhotoRepository>(TYPES.Photo).to(PhotoDataAccess)
container.bind<PhotoService>(TYPES.PhotoService).to(PhotoService)

export { container }
