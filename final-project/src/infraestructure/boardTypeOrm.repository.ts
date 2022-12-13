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

  async resize (size: number): Promise<BoardEntity> {
    this.repository.boardHeight = size
    this.repository.boardWidth = size
    return await this.repository
  }
}
