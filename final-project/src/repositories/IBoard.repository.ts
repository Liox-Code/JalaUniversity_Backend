import { BoardEntity } from '../entities/board.entity'
import { IPosition } from '../interfaces/IPosition'

export interface IBoardRepository {
  initialDB:() => void
  createBoard(board: BoardEntity): Promise<BoardEntity>
  readBoard(id: number): Promise<BoardEntity>
  updateBoard(board: BoardEntity): Promise<BoardEntity>
  randomPosition (limits: number): Promise<IPosition>
}
