import { BoardEntity } from '../entities/board.entity'

export interface IBoardRepository {
  read(): Promise<BoardEntity>
  resize(size: number): Promise<BoardEntity>
}
