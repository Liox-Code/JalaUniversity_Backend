import { Container } from 'inversify'
import { TYPES } from '../../src/type.core'
import 'reflect-metadata'
// Random Generator
import { RandomGeneratorService } from '../../src/core/domain/services/randomGeneratorService'
// Board
import { BoardService } from '../../src/core/domain/services/board.service'
import { BoardTypeOrmRepositoryMock } from './__mocks__/boardRepositoryMock'
import { BoardEntity } from '../../src/core/domain/entities/board.entity'

let component:BoardService
let randomService:RandomGeneratorService
beforeEach(async () => {
  const container = new Container()
  // Board
  container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)
  container.bind<BoardTypeOrmRepositoryMock>(TYPES.BoardTypeOrmRepository).to(BoardTypeOrmRepositoryMock)
  container.bind<BoardService>(TYPES.BoardService).to(BoardService)
  randomService = container.get<RandomGeneratorService>(TYPES.RandomGeneratorService)
  component = container.get<BoardService>(TYPES.BoardService)
})

test('Create a board', async () => {
  const board = await component.createBoard(new BoardEntity(1, 12))
  expect(board).toEqual({
    boardId: 1,
    boardSize: 12
  })
})

test('Read a board', async () => {
  const board = await component.readBoard(1)
  expect(board).toEqual({
    boardId: 1,
    boardSize: 12
  })
})

test('Update a board', async () => {
  const board = await component.updateBoard(new BoardEntity(1, 12))
  expect(board).toEqual({
    boardId: 1,
    boardSize: 12
  })
})

test('RandomNumber returns a random position between 0 and 10', () => {
  const randomNumber = randomService.generateRandomPosition(1, 10)
  expect(randomNumber.x).toBeGreaterThanOrEqual(0)
  expect(randomNumber.x).toBeLessThanOrEqual(10)
  expect(randomNumber.y).toBeGreaterThanOrEqual(0)
  expect(randomNumber.y).toBeLessThanOrEqual(10)
})

test('randomNumber returns a different value each time it is called', () => {
  const firstRandomNumber = randomService.generateRandomPosition(2, 10)
  const secondRandomNumber = randomService.generateRandomPosition(3, 10)
  expect(firstRandomNumber).not.toEqual(secondRandomNumber)
})
