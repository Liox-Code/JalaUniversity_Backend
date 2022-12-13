import { inject, injectable } from 'inversify'
import { BoardEntity } from '../entities/board.entity'
import { IBoardRepository } from '../repositories/IBoard.repository'
import { TYPES } from '../type.core'

@injectable()
export class BoardService {
  private board: IBoardRepository
  constructor (@inject(TYPES.BoardTypeOrm) board: IBoardRepository) {
    this.board = board
  }

  async read () {
    return await this.board.read()
  }

  async resize (board: BoardEntity) {
    return await this.board.resize(board)
  }
}
