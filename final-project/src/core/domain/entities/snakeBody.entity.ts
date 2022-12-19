import { IPosition } from '../interfaces/IPosition'

export class SnakeBodyEntity {
  snakeBodyPosition: IPosition

  constructor (snakeBodyPosition: IPosition) {
    this.snakeBodyPosition = snakeBodyPosition
  }
}
