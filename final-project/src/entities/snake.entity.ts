import { IPosition } from '../interfaces/IPosition'

export class SnakeEntity {
  snakeId: number
  snakeHeadPosition: IPosition
  snakeSize: number

  constructor (snakeId: number, snakeHeadPosition: IPosition, snakeSize: number) {
    this.snakeId = snakeId
    this.snakeHeadPosition = snakeHeadPosition
    this.snakeSize = snakeSize
  }
}
