import { Container } from 'inversify'
import { TYPES } from './type.core'
import { IPhotoRepository } from './repositories/IPhotoRepository'
import { PhotoDataAccess } from './database/photoDataAccess'
import { PhotoService } from './services/photoService'

const container = new Container()

container.bind<IPhotoRepository>(TYPES.Photo).to(PhotoDataAccess)
container.bind<PhotoService>(TYPES.PhotoService).to(PhotoService)

export { container }
