import { BoardEntity } from '../entities/board.entity'

export interface IBoardRepository {
  create(board:BoardEntity): Promise<BoardEntity>
  read(): Promise<BoardEntity>
  resize(size: number): Promise<BoardEntity>
}
