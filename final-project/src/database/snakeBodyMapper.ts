import { SnakeBodyEntity } from '../core/domain/entities/snakeBody.valueObject'
import SnakeBodyDataEntity from './snakeBodyDataEntity'

export class SnakeBodyMapper {
  static toEntity (snakeBody: SnakeBodyDataEntity): SnakeBodyEntity {
    const snakeBodyEntity: SnakeBodyEntity = {
      snakeBodyIndex: snakeBody.snakeBodyNumber,
      snakeBodyPosition: { x: snakeBody.snakeBodyXAxis, y: snakeBody.snakeBodyYAxis }
    }

    return snakeBodyEntity
  }

  static toDataEntity (snakeHeadId:number, snakeBody: SnakeBodyEntity): SnakeBodyDataEntity {
    const snakeBodyDataEntity: SnakeBodyDataEntity = {
      snakeBodyId: parseInt(snakeHeadId.toString() + snakeBody.snakeBodyIndex.toString()),
      snakeId: snakeHeadId,
      snakeBodyNumber: snakeBody.snakeBodyIndex,
      snakeBodyXAxis: snakeBody.snakeBodyPosition.x,
      snakeBodyYAxis: snakeBody.snakeBodyPosition.y
    }

    return snakeBodyDataEntity
  }
}
