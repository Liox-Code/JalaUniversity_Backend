import { SnakeBodyEntity } from '../entities/snakeBody.valueObject'

export interface ISnakeBodyRepository {
  createSnakeBody: (snakeId: number, snakeBody: SnakeBodyEntity) => Promise<void>
  readSnakeBody: (id: number) => Promise<SnakeBodyEntity[]>
  updateSnakeBody: (snakeId: number, snakeBody: SnakeBodyEntity) => Promise<void>
  dieSnake: () => void
}
