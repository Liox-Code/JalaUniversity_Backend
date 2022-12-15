import { MatchGameEntity } from '../entities/matchGame.entity'
import MatchGameDataEntity from './matchGameDataEntity'

export class MatchGameMapper {
  static toEntity (matchGame: MatchGameDataEntity): MatchGameEntity {
    const matchGameDataEntity: MatchGameEntity = {
      matchGameId: matchGame.matchGameId,
      boardId: matchGame.boardId,
      snakeId: matchGame.snakeId
    }

    return matchGameDataEntity
  }

  static toDataEntity (matchGame: MatchGameEntity): MatchGameDataEntity {
    const matchGameDataEntity: MatchGameDataEntity = {
      matchGameId: matchGame.matchGameId,
      boardId: matchGame.boardId,
      snakeId: matchGame.snakeId
    }

    return matchGameDataEntity
  }
}
