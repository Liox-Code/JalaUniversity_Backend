import { inject, injectable } from 'inversify'
import { IPosition } from '../interfaces/IPosition'
import { ISnakeRepository } from '../repositories/ISnake.repository'
import { TYPES } from '../type.core'

@injectable()
export class SnakeService {
  private snake: ISnakeRepository
  constructor (@inject(TYPES.SnakeTypeOrm) snake: ISnakeRepository) {
    this.snake = snake
  }

  async nextPosition (newPosition: IPosition) {
    return await this.snake.nextPosition(newPosition)
  }

  grow () {
    this.snake.grow()
  }
}
