import { IPosition } from '../interfaces/IPosition'

export class SnakeBodyEntity {
  snakeBodyIndex: number
  snakeBodyPosition: IPosition

  constructor (snakeBodyIndex: number, snakeBodyPosition: IPosition) {
    this.snakeBodyIndex = snakeBodyIndex
    this.snakeBodyPosition = snakeBodyPosition
  }
}
