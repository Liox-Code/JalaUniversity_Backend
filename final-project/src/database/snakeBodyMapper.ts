import { SnakeBodyEntity } from '../core/domain/entities/snakeBody.entity'
import SnakeBodyDataEntity from './snakeBodyDataEntity'

export class SnakeBodyMapper {
  static toEntity (snakeBody: SnakeBodyDataEntity): SnakeBodyEntity {
    const snakeBodyEntity: SnakeBodyEntity = {
      snakeBodyIndex: snakeBody._id,
      snakeBodyPosition: { x: snakeBody.snakeBodyXAxis, y: snakeBody.snakeBodyYAxis }
    }

    return snakeBodyEntity
  }

  static toDataEntity (snakeId: number, snakeBody: SnakeBodyEntity): SnakeBodyDataEntity {
    const snakeBodyDataEntity: SnakeBodyDataEntity = {
      snakeBodyId: parseInt(snakeId.toString() + snakeBody.snakeBodyIndex.toString()),
      snakeId,
      snakeIndex: snakeBody.snakeBodyIndex,
      snakeBodyXAxis: snakeBody.snakeBodyPosition.x,
      snakeBodyYAxis: snakeBody.snakeBodyPosition.y
    }

    return snakeBodyDataEntity
  }
}
