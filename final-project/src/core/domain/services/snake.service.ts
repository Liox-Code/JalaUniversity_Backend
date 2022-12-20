import { inject, injectable } from 'inversify'
import { ISnakeRepository } from '../repositories/ISnakeHead.repository'
import { TYPES } from '../../../type.core'
import { EDirection } from '../../../enums/EDirection'
import { SnakeEntity } from '../entities/snake.entity'

@injectable()
export class SnakeService {
  private readonly snake: ISnakeRepository
  constructor (@inject(TYPES.SnakeHeadTypeOrmRepository) snake: ISnakeRepository) {
    this.snake = snake
  }

  async createSnake (snake: SnakeEntity) {
    return await this.snake.createSnake(snake)
  }

  async readSnake (id: number) {
    return await this.snake.readSnake(id)
  }

  async moveSnake (direction: EDirection, snake: SnakeEntity, limit: number) {
    return await this.snake.moveSnake(direction, snake, limit)
  }

  async updateSnake (snake: SnakeEntity) {
    return await this.snake.updateSnake(snake)
  }

  grow () {
    this.snake.grow()
  }
}
