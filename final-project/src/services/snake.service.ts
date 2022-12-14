import { inject, injectable } from 'inversify'
import { IPosition } from '../interfaces/IPosition'
import { ISnakeRepository } from '../repositories/ISnake.repository'
import { TYPES } from '../type.core'
import { EDirection } from '../enums/EDirection'
import { SnakeEntity } from '../entities/snake.entity'

@injectable()
export class SnakeService {
  private readonly snake: ISnakeRepository
  constructor (@inject(TYPES.SnakeTypeOrm) snake: ISnakeRepository) {
    this.snake = snake
  }

  async createSnake (snake: SnakeEntity) {
    return await snake
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
