import { SnakeEntity } from '../core/domain/entities/snake.entity'
import { EDirection } from '../enums/EDirection'
import SnakeDataEntity from './snakeDataEntity'

export class SnakeMapper {
  static toEntity (snake: SnakeDataEntity): SnakeEntity {
    const snakeEntity: SnakeEntity = {
      snakeId: snake.snakeId,
      snakeDirection: EDirection[snake.snakeDirection as EDirection],
      snakeHeadPosition: { x: snake.snakeHeadXPosition, y: snake.snakeHeadYPosition },
      snakeSize: snake.snakeSize
    }

    return snakeEntity
  }

  static toDataEntity (snake: SnakeEntity): SnakeDataEntity {
    const snakeDataEntity: SnakeDataEntity = {
      snakeId: snake.snakeId,
      snakeDirection: snake.snakeDirection,
      snakeHeadXPosition: snake.snakeHeadPosition.x,
      snakeHeadYPosition: snake.snakeHeadPosition.y,
      snakeSize: snake.snakeSize
    }

    return snakeDataEntity
  }
}
