import { container } from './inversify.config'
import { PhotoService } from './services/photo.service'
import { TYPES } from './type.core'

const PhotoObj = container.get<PhotoService>(TYPES.Photo)
PhotoObj.create()
