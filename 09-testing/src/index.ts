import { container } from './inversify.config'
import { PhotoController } from './photo.controller'
import { TYPES } from './type.core'

const PhotoObj = container.get<PhotoController>(TYPES.Photo)
PhotoObj.create()
PhotoObj.update()
PhotoObj.delete()
PhotoObj.read()
