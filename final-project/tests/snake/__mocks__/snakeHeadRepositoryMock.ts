import { injectable } from 'inversify'
import 'reflect-metadata'
import { SnakeEntity } from '../../../src/core/domain/entities/snake.entity'
import { ISnakeHeadRepository } from '../../../src/core/domain/repositories/ISnakeHead.repository'
import { snakeHeadPropsMock } from './snakeHeadPropsMock'

@injectable()
export class SnakeHeadTypeOrmRepositoryMock implements ISnakeHeadRepository {
  async createSnake (snake: SnakeEntity) {
    return await snake
  }

  async readSnake (id: number) {
    const { snakeId, snakeHeadPosition, snakeSize } = snakeHeadPropsMock
    return await new SnakeEntity(snakeId, snakeHeadPosition, snakeSize)
  }

  async updateSnake (snake: SnakeEntity) {
    return await snake
  }
}
