import { SnakeEntity } from '../entities/snake.entity'
import { EDirection } from '../../../enums/EDirection'

export interface ISnakeRepository {
  initialDB:() => void
  createSnake: (snake: SnakeEntity) => Promise<SnakeEntity>
  readSnake: (id: number) => Promise<SnakeEntity>
  moveSnake: (direction: EDirection, snake: SnakeEntity, limit: number) => Promise<SnakeEntity>
  updateSnake: (snake: SnakeEntity) => Promise<SnakeEntity>
  grow: () => void
  die: () => void
}
