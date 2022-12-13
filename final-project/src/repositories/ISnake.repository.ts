import { SnakeEntity } from '../entities/snake.entity'
import { EDirection } from '../enums/EDirection'
import { IPosition } from '../interfaces/IPosition'

export interface ISnakeRepository {
  directionPosition: (direction: EDirection, currentPosition: IPosition) => Promise<IPosition>
  updatePosition: (newPosition: IPosition) => Promise<SnakeEntity>
  grow: () => void
  die: () => void
}
