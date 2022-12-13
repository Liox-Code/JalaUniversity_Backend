import { container } from './inversify.config'
import { TYPES } from './type.core'
import { SnakeService } from './services/snake.service'
import 'reflect-metadata'

class Test {
  async initializeDb () {
    const PhotoObj = await container.get<SnakeService>(TYPES.SnakeTypeOrm)
    PhotoObj.grow()
  }
}

new Test().initializeDb()
