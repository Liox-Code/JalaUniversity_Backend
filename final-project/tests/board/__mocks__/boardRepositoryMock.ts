import { injectable } from 'inversify'
import 'reflect-metadata'
import { BoardEntity } from '../../../src/core/domain/entities/board.entity'
import { IBoardRepository } from '../../../src/core/domain/repositories/IBoard.repository'
import { boardPropsMock } from './boardPropsMock'

@injectable()
export class BoardTypeOrmRepositoryMock implements IBoardRepository {
  private createBoardMock: jest.Mock
  private readBoardMock: jest.Mock
  private updateBoardMock: jest.Mock

  constructor () {
    this.createBoardMock = jest.fn()
    this.readBoardMock = jest.fn()
    this.updateBoardMock = jest.fn()
  }

  async createBoard (board: BoardEntity): Promise<BoardEntity> {
    await this.createBoardMock(board)
    return new BoardEntity(boardPropsMock.boardId, boardPropsMock.boardSize)
  }

  async readBoard (id: number): Promise<BoardEntity> {
    await this.readBoardMock(id)
    return new BoardEntity(boardPropsMock.boardId, boardPropsMock.boardSize)
  }

  async updateBoard (board: BoardEntity): Promise<BoardEntity> {
    await this.updateBoardMock(board)
    const boardToUpdate = new BoardEntity(board.boardId, board.boardSize)
    boardToUpdate.boardId = board.boardId
    boardToUpdate.boardSize = board.boardSize
    return boardToUpdate
  }

  async eraseBoard (boardId: number): Promise<void> {
    await console.log(boardId)
  }
}
