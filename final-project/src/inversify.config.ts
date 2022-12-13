import { Container } from 'inversify'
import { TYPES } from './type.core'
import { ISnakeRepository } from './repositories/ISnake.repository'
import { SnakeTypeOrmRepository } from './infraestructure/snakeTypeOrm.repository'
import { SnakeService } from './services/snake.service'

const container = new Container()

container.bind<ISnakeRepository>(TYPES.SnakeTypeOrm).to(SnakeTypeOrmRepository)
container.bind<SnakeService>(TYPES.SnakeService).to(SnakeService)

export { container }
