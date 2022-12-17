import { inject } from 'inversify'
import { TYPES } from '../../../type.core'
import { BoardEntity } from '../entities/board.entity'

export class MatchGameFactory {
  private boardEntity: BoardEntity
  constructor (@inject(TYPES.BoardEntity) boardEntity: BoardEntity) {
    this.boardEntity = boardEntity
  }
}
