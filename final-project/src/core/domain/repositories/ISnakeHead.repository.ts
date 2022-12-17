import { SnakeHeadEntity } from '../entities/snakeHead.entity'
import { EDirection } from '../../../enums/EDirection'

export interface ISnakeRepository {
  initialDB:() => void
  createSnake: (snake: SnakeHeadEntity) => Promise<SnakeHeadEntity>
  readSnake: (id: number) => Promise<SnakeHeadEntity>
  moveSnake: (direction: EDirection, snake: SnakeHeadEntity, limit: number) => Promise<SnakeHeadEntity>
  updateSnake: (snake: SnakeHeadEntity) => Promise<SnakeHeadEntity>
  grow: () => void
  die: () => void
}
