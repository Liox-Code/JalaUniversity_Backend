import { injectable } from 'inversify'
import 'reflect-metadata'
import { SnakeBodyEntity } from '../../../src/core/domain/entities/snakeBody.entity'
import { ISnakeBodyRepository } from '../../../src/core/domain/repositories/ISnakeBody.repository'
import { snakeBodyPropsMock } from './snakeBodyPropsMock'

@injectable()
export class SnakeBodyTypeOrmRepositoryMock implements ISnakeBodyRepository {
  async createSnake (snakeId: number, snakeBody: SnakeBodyEntity) {
    return await snakeBody
  }

  async readSnakeBody (id: number) {
    const snakeNodesList: SnakeBodyEntity[] = []
    const { snakeBodyIndex, snakeBodyPosition } = snakeBodyPropsMock
    const snakeNode = new SnakeBodyEntity(snakeBodyIndex, snakeBodyPosition)
    snakeNodesList.push(snakeNode)
    return await snakeNodesList
  }

  async updateSnakeBody (snakeId: number, snakeBody: SnakeBodyEntity) {
    return await snakeBody
  }

  async eraseSnakeBody (id: number) {
    await id
  }
  // async createSnake (snake: SnakeBodyEntity) {
  //   return await snake
  // }

  // async readSnake (id: number) {
  //   const { snakeId, snakeHeadPosition, snakeSize } = snakeHeadPropsMock
  //   return await new SnakeBodyEntity(snakeId, snakeHeadPosition, snakeSize)
  // }

  // async updateSnake (snake: SnakeBodyEntity) {
  //   return await snake
  // }
}
