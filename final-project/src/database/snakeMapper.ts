import { SnakeAggregate } from '../core/domain/aggregates/snake.aggregate'
import { SnakeHeadEntity } from '../core/domain/entities/snakeHead.valueObject'
import SnakeDataEntity from './snakeDataEntity'

export class SnakeMapper {
  static toEntity (snake: SnakeDataEntity): SnakeHeadEntity {
    const snakeEntity: SnakeHeadEntity = {
      snakeHeadPosition: { x: snake.snakeHeadXPosition, y: snake.snakeHeadYPosition }
    }

    return snakeEntity
  }

  static toDataEntity (snake: SnakeAggregate): SnakeDataEntity {
    const snakeEntity: SnakeDataEntity = {
      snakeId: snake.snakeId,
      snakeDirection: snake.snakeDirection,
      snakeHeadXPosition: snake.snakeHead.snakeHeadPosition.x,
      snakeHeadYPosition: snake.snakeHead.snakeHeadPosition.y,
      snakeSize: snake.snakeSize
    }

    return snakeEntity
  }
}
