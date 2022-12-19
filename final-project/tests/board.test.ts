import { BoardService } from '../src/services/board.service'
import { BoardTypeOrmRepositoryMock } from './__mocks__/boardRepositoryMock'
import 'reflect-metadata'

let boardService: BoardService
let boardRepo: BoardTypeOrmRepositoryMock

beforeEach(async () => {
  boardRepo = await new BoardTypeOrmRepositoryMock()
  boardService = await new BoardService(boardRepo)
})

it('', async () => {
  // const boardCreated = await boardService.readBoard(1)
  // expect(boardCreated).toBe({
  //   boardId: 1,
  //   boardSize: 12
  // })
})

// beforeEach(() => { bishop = new Bishop('WHITE', 'C', 1) })

// it('Should not move to the same place', () => {
//   const position = new Position('C', 1)
//   expect(bishop.canMoveTo(position)).toBe(false)
// })
// it('Should not move vertically', () => {
//   const position = new Position('C', 8)
//   expect(bishop.canMoveTo(position)).toBe(false)
// })
