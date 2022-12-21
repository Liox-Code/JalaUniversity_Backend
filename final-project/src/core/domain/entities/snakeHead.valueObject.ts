import { IPosition } from '../interfaces/IPosition'

export class SnakeHeadEntity {
  snakeHeadPosition: IPosition

  constructor (snakeHeadPosition: IPosition) {
    this.snakeHeadPosition = snakeHeadPosition
  }
}
