import { SnakeEntity } from '../entities/snake.entity'
import { IPosition } from '../interfaces/IPosition'

export interface ISnakeRepository {
  nextPosition: (newPosition: IPosition) => Promise<SnakeEntity>
  grow: () => void
  die: () => void
}
