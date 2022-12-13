import { inject, injectable } from 'inversify'
import { ISnakeRepository } from '../repositories/ISnake.repository'
import { TYPES } from '../type.core'

@injectable()
export class SnakeService {
  private snake: ISnakeRepository
  constructor (@inject(TYPES.SnakeTypeOrm) snake: ISnakeRepository) {
    this.snake = snake
  }

  grow () {
    this.snake.grow()
  }
}
