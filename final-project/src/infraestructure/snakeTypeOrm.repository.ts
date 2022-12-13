import { injectable } from 'inversify'
import { SnakeEntity } from '../entities/snake.entity'
import { ISnakeRepository } from '../repositories/ISnake.repository'
import 'reflect-metadata'
import { IPosition } from '../interfaces/IPosition'

@injectable()
export class SnakeTypeOrmRepository implements ISnakeRepository {
  private readonly repository: SnakeEntity

  constructor () {
    this.repository = {
      snakeId: 12,
      snakeHeadPosition: { x: 1, y: 2 },
      snakeSize: 12
    }
  }

  async nextPosition (newPosition: IPosition) {
    this.repository.snakeHeadPosition = newPosition
    return await this.repository
  }

  grow () {
    console.log('grow')
  }

  die () {
    console.log('die')
  }
}
