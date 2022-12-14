import { BoardEntity } from '../entities/board.entity'
import BoardDataEntity from './boardDataEntity'

export class BoardMapper {
  static toEntity (board: BoardEntity): BoardDataEntity {
    const boardDataEntity: BoardDataEntity = {
      boardId: board.boardId,
      boardHeight: board.boardHeight,
      boardWidth: board.boardWidth
    }

    return boardDataEntity
  }

  static toDataEntity (board: BoardDataEntity): BoardEntity {
    const boardDataEntity: BoardDataEntity = {
      boardId: board.boardId,
      boardHeight: board.boardHeight,
      boardWidth: board.boardWidth
    }

    return boardDataEntity
  }
}
