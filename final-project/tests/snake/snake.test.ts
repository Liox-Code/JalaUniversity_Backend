import { Container } from 'inversify'
import { TYPES } from '../../src/type.core'
import 'reflect-metadata'
import { SnakeService } from '../../src/core/domain/services/snake.service'
import { SnakeHeadTypeOrmRepositoryMock } from './__mocks__/snakeHeadRepositoryMock'
import { SnakeBodyTypeOrmRepositoryMock } from './__mocks__/snakeBodyRepositoryMock'
import { ISnakeHeadRepository } from '../../src/core/domain/repositories/ISnakeHead.repository'
import { RandomGeneratorService } from '../../src/core/domain/services/randomGeneratorService'
import { BoardTypeOrmRepositoryMock } from '../board/__mocks__/boardRepositoryMock'
import { ISnakeBodyRepository } from '../../src/core/domain/repositories/ISnakeBody.repository'
import { EDirection } from '../../src/enums/EDirection'

let component: SnakeService
beforeEach(async () => {
  const container = new Container()
  container.bind<ISnakeHeadRepository>(TYPES.SnakeHeadTypeOrmRepository).to(SnakeHeadTypeOrmRepositoryMock)
  container.bind<ISnakeBodyRepository>(TYPES.SnakeBodyTypeOrmRepository).to(SnakeBodyTypeOrmRepositoryMock)
  container.bind<BoardTypeOrmRepositoryMock>(TYPES.BoardTypeOrmRepository).to(BoardTypeOrmRepositoryMock)
  container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)
  container.bind<SnakeService>(TYPES.SnakeService).to(SnakeService)
  component = container.get<SnakeService>(TYPES.SnakeService)
})

test('Create a snake', async () => {
  const snake = await component.createSnakeHead(1)
})

// test('Create a snake', async () => {
//   const snake = await component.createSnakeHead(1)
//   expect(snake).toEqual({
//     snakeId: 1,
//     snakeHeadPosition: { x: 7, y: 9 },
//     snakeDirection: EDirection.UP,
//     snakeSize: 1
//   })
// })
