import { IPosition } from '../interfaces/IPosition'

export interface ISnakeRepository {
  nextPosition: (newPosition: IPosition) => void
  grow: () => void
  die: () => void
}
