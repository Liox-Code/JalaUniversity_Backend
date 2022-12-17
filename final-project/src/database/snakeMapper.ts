import { SnakeEntity } from '../core/domain/entities/snake.entity'
import SnakeDataEntity from './snakeDataEntity'

export class SnakeMapper {
  static toEntity (snake: SnakeDataEntity): SnakeEntity {
    const snakeEntity: SnakeEntity = {
      snakeId: snake.snakeId,
      snakeHeadPosition: { x: snake.snakeHeadXPosition, y: snake.snakeHeadYPosition },
      snakeSize: snake.snakeSize
    }

    return snakeEntity
  }

  static toDataEntity (snake: SnakeEntity): SnakeDataEntity {
    const snakeEntity: SnakeDataEntity = {
      snakeId: snake.snakeId,
      snakeHeadXPosition: snake.snakeHeadPosition.x,
      snakeHeadYPosition: snake.snakeHeadPosition.y,
      snakeSize: snake.snakeSize
    }

    return snakeEntity
  }
}
