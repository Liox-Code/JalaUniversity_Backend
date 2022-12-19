import 'reflect-metadata'
import { BoardEntity } from '../../src/entities/board.entity'
import { IPosition } from '../../src/interfaces/IPosition'
import { IBoardRepository } from '../../src/repositories/IBoard.repository'
import { boardPropsMock } from './boardPropsMock'

const { boardId, boardSize } = boardPropsMock

export class BoardTypeOrmRepositoryMock implements IBoardRepository {
  private initialDBMock: jest.Mock
  private createBoardMock: jest.Mock
  private readBoardMock: jest.Mock
  private updateBoardMock: jest.Mock
  private randomPositionMock: jest.Mock

  constructor () {
    this.initialDBMock = jest.fn()
    this.createBoardMock = jest.fn()
    this.readBoardMock = jest.fn()
    this.updateBoardMock = jest.fn()
    this.randomPositionMock = jest.fn()
  }

  async initialDB () {
    await this.initialDBMock()
  }

  async createBoard (board: BoardEntity): Promise<BoardEntity> {
    await this.createBoardMock(board)
    return new BoardEntity(boardId, boardSize)
  }

  async readBoard (id: number): Promise<BoardEntity> {
    await this.readBoardMock(id)
    return new BoardEntity(boardId, boardSize)
  }

  async updateBoard (board: BoardEntity): Promise<BoardEntity> {
    await this.updateBoardMock(board)
    return new BoardEntity(boardId, boardSize)
  }

  randomPosition (limits: number): IPosition {
    const random = (seed:number, multiplier:number, incrementer:number, limits: number) => {
      const A = multiplier
      const C = incrementer
      const M = limits

      seed = (seed * A + C) % M
      return seed
    }

    const posX = random(Date.now(), 8, 7, limits)
    const posY = random(Date.now(), 11, 12, limits)

    return { x: posX, y: posY }
  }
}
