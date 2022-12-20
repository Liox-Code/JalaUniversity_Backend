import { SnakeBodyEntity } from '../core/domain/entities/snakeBody.entity'
import SnakeBodyDataEntity from './snakeBodyDataEntity'

export class SnakeBodyMapper {
  static toEntity (snakeBody: SnakeBodyDataEntity): SnakeBodyEntity {
    const snakeBodyEntity: SnakeBodyEntity = {
      snakeBodyIndex: snakeBody.snakeBodyId,
      snakeBodyPosition: { x: snakeBody.snakeBodyXAxis, y: snakeBody.snakeBodyYAxis }
    }

    return snakeBodyEntity
  }

  static toDataEntity (snakeHeadId:number, snakeBody: SnakeBodyEntity): SnakeBodyDataEntity {
    const snakeBodyDataEntity: SnakeBodyDataEntity = {
      snakeId: snakeHeadId,
      snakeBodyId: parseInt(snakeHeadId.toString() + snakeBody.snakeBodyIndex.toString()),
      snakeBodyXAxis: snakeBody.snakeBodyPosition.x,
      snakeBodyYAxis: snakeBody.snakeBodyPosition.y
    }

    return snakeBodyDataEntity
  }
}
