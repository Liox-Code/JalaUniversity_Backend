import { SnakeBodyEntity } from '../entities/snakeBody.entity'

export interface ISnakeBodyRepository {
  createSnake: (snakeId: number, snakeBody: SnakeBodyEntity) => Promise<SnakeBodyEntity>
  readSnakeBody: (id: number) => Promise<SnakeBodyEntity[]>
  updateSnakeBody: (snakeId: number, snakeBody: SnakeBodyEntity) => Promise<SnakeBodyEntity>
  eraseSnakeBody: (id: number) => Promise<void>
}
