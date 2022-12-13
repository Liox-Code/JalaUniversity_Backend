import { injectable } from 'inversify'
import { SnakeEntity } from '../entities/snake.entity'
import { ISnakeRepository } from '../repositories/ISnake.repository'
import 'reflect-metadata'
import { IPosition } from '../interfaces/IPosition'
import { EDirection } from '../enums/EDirection'

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

  async directionPosition (direction: EDirection, currentPosition: IPosition) {
    const directionsList = {
      [EDirection.UP]: { x: 0, y: 1 },
      [EDirection.DOWN]: { x: 0, y: -1 },
      [EDirection.RIGHT]: { x: 1, y: 0 },
      [EDirection.LEFT]: { x: -1, y: 0 }
    }
    currentPosition.x = currentPosition.x + directionsList[direction].x
    currentPosition.y = currentPosition.y + directionsList[direction].y
    return await currentPosition
  }

  async updatePosition (newPosition: IPosition) {
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
