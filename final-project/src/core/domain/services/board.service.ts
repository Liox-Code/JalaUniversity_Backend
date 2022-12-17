import { inject, injectable } from 'inversify'
import { BoardEntity } from '../entities/board.entity'
import { IPosition } from '../interfaces/IPosition'
import { IBoardRepository } from '../repositories/IBoard.repository'
import { TYPES } from '../../../type.core'

@injectable()
export class BoardService {
  private board: IBoardRepository
  constructor (@inject(TYPES.BoardTypeOrmRepository) board: IBoardRepository) {
    this.board = board
  }

  async initialDB () {
    return await this.board.initialDB()
  }

  async createBoard (board: BoardEntity): Promise<BoardEntity> {
    return await this.board.createBoard(board)
  }

  async readBoard (id: number): Promise<BoardEntity> {
    return await this.board.readBoard(id)
  }

  async updateBoard (board: BoardEntity): Promise<BoardEntity> {
    return await this.board.updateBoard(board)
  }

  randomPosition (limits: number): IPosition {
    return this.board.randomPosition(limits)
  }
}
