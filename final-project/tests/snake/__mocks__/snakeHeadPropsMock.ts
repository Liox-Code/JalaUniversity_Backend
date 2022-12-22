import { SnakeEntity } from '../../../src/core/domain/entities/snake.entity'
import { EDirection } from '../../../src/enums/EDirection'

export const snakeHeadPropsMock: SnakeEntity = {
  snakeId: 1,
  snakeHeadPosition: { x: 10, y: 12 },
  snakeDirection: EDirection.UP,
  snakeSize: 1
}
