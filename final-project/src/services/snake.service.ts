import { inject, injectable } from 'inversify'
import { IPosition } from '../interfaces/IPosition'
import { ISnakeRepository } from '../repositories/ISnake.repository'
import { TYPES } from '../type.core'
import { EDirection } from '../enums/EDirection'

@injectable()
export class SnakeService {
  private snake: ISnakeRepository
  constructor (@inject(TYPES.SnakeTypeOrm) snake: ISnakeRepository) {
    this.snake = snake
  }

  async directionPosition (direction: EDirection, currentPosition: IPosition) {
    return await this.snake.directionPosition(direction, currentPosition)
  }

  async updatePosition (newPosition: IPosition) {
    return await this.snake.updatePosition(newPosition)
  }

  grow () {
    this.snake.grow()
  }
}
