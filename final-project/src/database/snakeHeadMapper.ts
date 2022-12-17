import { SnakeHeadEntity } from '../core/domain/entities/snakeHead.entity'
import SnakeHeadDataEntity from './snakeHeadDataEntity'

export class SnakeMapper {
  static toEntity (snake: SnakeHeadDataEntity): SnakeHeadEntity {
    const snakeEntity: SnakeHeadEntity = {
      snakeId: snake.snakeId,
      snakeHeadPosition: { x: snake.snakeHeadXPosition, y: snake.snakeHeadYPosition },
      snakeSize: snake.snakeSize
    }

    return snakeEntity
  }

  static toDataEntity (snake: SnakeHeadEntity): SnakeHeadDataEntity {
    const snakeEntity: SnakeHeadDataEntity = {
      snakeId: snake.snakeId,
      snakeHeadXPosition: snake.snakeHeadPosition.x,
      snakeHeadYPosition: snake.snakeHeadPosition.y,
      snakeSize: snake.snakeSize
    }

    return snakeEntity
  }
}
