import { SnakeEntity } from '../entities/snake.entity'

export interface ISnakeHeadRepository {
  createSnake: (snake: SnakeEntity) => Promise<SnakeEntity>
  readSnake: (id: number) => Promise<SnakeEntity>
  updateSnake: (snake: SnakeEntity) => Promise<SnakeEntity>
}
