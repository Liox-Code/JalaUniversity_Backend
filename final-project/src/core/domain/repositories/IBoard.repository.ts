import { BoardEntity } from '../entities/board.entity'

export interface IBoardRepository {
  createBoard(board: BoardEntity): Promise<BoardEntity>
  readBoard(id: number): Promise<BoardEntity>
  updateBoard(board: BoardEntity): Promise<BoardEntity>
}
