import { BoardEntity } from '../entities/board.entity'

export interface IBoardRepository {
  read(): Promise<BoardEntity>
  resize(board: BoardEntity): Promise<BoardEntity>
}
