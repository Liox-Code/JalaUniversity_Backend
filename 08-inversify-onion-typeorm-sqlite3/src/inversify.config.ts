import { Container } from 'inversify'
import { TYPES } from './type.core'
import { PhotoRepositoryImpl } from './repository/photoRepositoryImpl'

const container = new Container()

container.bind<PhotoRepositoryImpl>(TYPES.Photo).to(PhotoRepositoryImpl).inSingletonScope()
export default container
