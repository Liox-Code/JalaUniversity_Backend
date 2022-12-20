import { SnakeBodyEntity } from '../core/domain/entities/snakeBody.entity'
import SnakeBodyDataEntity from './snakeBodyDataEntity'

export class SnakeBodyMapper {
  static toEntity (snakeBody: SnakeBodyDataEntity): SnakeBodyEntity {
    const snakeBodyEntity: SnakeBodyEntity = {
      snakeBodyPosition: { x: snakeBody.snakeBodyXAxis, y: snakeBody.snakeBodyYAxis }
    }

    return snakeBodyEntity
  }

  static toDataEntity (snakeHeadId:number, snakeBody: SnakeBodyEntity): SnakeBodyDataEntity {
    const snakeBodyDataEntity: SnakeBodyDataEntity = {
      snakeId: snakeHeadId,
      snakeBodyXAxis: snakeBody.snakeBodyPosition.x,
      snakeBodyYAxis: snakeBody.snakeBodyPosition.y
    }

    return snakeBodyDataEntity
  }
}
