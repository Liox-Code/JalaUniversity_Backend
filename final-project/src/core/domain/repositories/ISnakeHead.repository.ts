import { SnakeEntity } from '../entities/snake.entity'
import { SnakeBodyEntity } from '../entities/snakeBody.entity'

export interface ISnakeRepository {
  createSnake: (snake: SnakeEntity) => Promise<SnakeEntity>
  readSnake: (id: number) => Promise<SnakeEntity>
  updateSnake: (snake: SnakeEntity) => Promise<SnakeEntity>
  growSnake: (snakeId: number, snakeBody: SnakeBodyEntity) => Promise<SnakeBodyEntity>
  readSnakeBody: (id: number) => Promise<SnakeBodyEntity[]>
  updateSnakeBody: (snakeId: number, snakeBody: SnakeBodyEntity) => Promise<SnakeBodyEntity>
  dieSnake: () => void
}
