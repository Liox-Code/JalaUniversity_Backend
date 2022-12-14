import { injectable } from 'inversify'
import { BoardEntity } from '../entities/board.entity'
import { IBoardRepository } from '../repositories/IBoard.repository'
import 'reflect-metadata'

@injectable()
export class BoardTypeOrmRepository implements IBoardRepository {
  private readonly repository: BoardEntity

  constructor () {
    this.repository = new BoardEntity(12, 14, 14)
  }

  async create (board: BoardEntity): Promise<BoardEntity> {
    this.repository.boardId = board.boardId
    this.repository.boardHeight = board.boardHeight
    this.repository.boardWidth = board.boardWidth
    return await this.repository
  }

  async read (): Promise<BoardEntity> {
    return await this.repository
  }

  async resize (size: number): Promise<BoardEntity> {
    this.repository.boardHeight = size
    this.repository.boardWidth = size
    return await this.repository
  }
}
