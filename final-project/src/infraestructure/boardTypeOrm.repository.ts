import { injectable } from 'inversify'
import { BoardEntity } from '../entities/board.entity'
import { IBoardRepository } from '../repositories/IBoard.repository'
import 'reflect-metadata'

@injectable()
export class BoardTypeOrmRepository implements IBoardRepository {
  private readonly repository: BoardEntity

  constructor () {
    this.repository = {
      boardId: 1,
      boardWidth: 12,
      boardHeight: 12
    }
  }

  async read (): Promise<BoardEntity> {
    return await this.repository
  }

  async resize (board: BoardEntity): Promise<BoardEntity> {
    this.repository.boardId = board.boardId
    this.repository.boardHeight = board.boardHeight
    this.repository.boardWidth = board.boardWidth
    return await this.repository
  }
}
