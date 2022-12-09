import { Container } from 'inversify'
import { PhotoDataAccess } from './database/photoDataAccess'
import { IPhotoRepository } from './repositories/IPhotoRepository'
import { PhotoService } from './services/photo.service'
import { TYPES } from './type.core'

const container = new Container()

container.bind<IPhotoRepository>(TYPES.Photo).to(PhotoDataAccess)
container.bind<PhotoService>(TYPES.PhotoService).to(PhotoService)

export { container }
