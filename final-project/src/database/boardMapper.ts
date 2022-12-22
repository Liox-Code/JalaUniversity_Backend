import { BoardEntity } from '../core/domain/entities/board.entity'
import BoardDataEntity from './boardDataEntity'

export class BoardMapper {
  static toEntity (board: BoardDataEntity): BoardEntity {
    const boardEntity: BoardEntity = {
      boardId: board.boardId,
      boardSize: board.boardSize
    }

    return boardEntity
  }

  static toDataEntity (board: BoardEntity): BoardDataEntity {
    const boardDataEntity: BoardDataEntity = {
      boardId: board.boardId,
      boardSize: board.boardSize
    }

    return boardDataEntity
  }
}
