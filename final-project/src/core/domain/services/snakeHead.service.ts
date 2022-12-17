import { inject, injectable } from 'inversify'
import { ISnakeRepository } from '../repositories/ISnakeHead.repository'
import { TYPES } from '../../../type.core'
import { EDirection } from '../../../enums/EDirection'
import { SnakeHeadEntity } from '../entities/snakeHead.entity'

@injectable()
export class SnakeService {
  private readonly snake: ISnakeRepository
  constructor (@inject(TYPES.SnakeHeadTypeOrmRepository) snake: ISnakeRepository) {
    this.snake = snake
  }

  async initilizeDb (): Promise<void> {
    await this.snake.initialDB()
  }

  async createSnake (snake: SnakeHeadEntity) {
    return await this.snake.createSnake(snake)
  }

  async readSnake (id: number) {
    return await this.snake.readSnake(id)
  }

  async moveSnake (direction: EDirection, snake: SnakeHeadEntity, limit: number) {
    return await this.snake.moveSnake(direction, snake, limit)
  }

  async updateSnake (snake: SnakeHeadEntity) {
    return await this.snake.updateSnake(snake)
  }

  grow () {
    this.snake.grow()
  }
}
