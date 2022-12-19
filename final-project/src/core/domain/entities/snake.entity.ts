import { EDirection } from '../../../enums/EDirection'
import { IPosition } from '../interfaces/IPosition'

export class SnakeEntity {
  snakeId: number
  snakeDirection: EDirection
  snakeHeadPosition: IPosition
  snakeSize: number

  constructor (snakeId: number, snakeHeadPosition: IPosition, snakeSize: number) {
    this.snakeId = snakeId
    this.snakeDirection = EDirection.UP
    this.snakeHeadPosition = snakeHeadPosition
    this.snakeSize = snakeSize
  }
}
