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
beforeEach(async () => {
  const container = new Container()
  // Board
  container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)
  container.bind<BoardTypeOrmRepositoryMock>(TYPES.BoardTypeOrmRepository).to(BoardTypeOrmRepositoryMock)
  container.bind<BoardService>(TYPES.BoardService).to(BoardService)
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
