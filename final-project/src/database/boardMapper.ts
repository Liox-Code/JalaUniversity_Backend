import { BoardEntity } from '../entities/board.entity'
import BoardDataEntity from './boardDataEntity'

export class BoardMapper {
  static toEntity (board: BoardDataEntity): BoardEntity {
    const boardDataEntity: BoardDataEntity = {
      boardId: board.boardId,
      boardSize: board.boardSize
    }

    return boardDataEntity
  }

  static toDataEntity (board: BoardEntity): BoardDataEntity {
    const boardDataEntity: BoardDataEntity = {
      boardId: board.boardId,
      boardSize: board.boardSize
    }

    return boardDataEntity
  }
}
