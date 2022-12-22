import { EMatchGameState, MatchGameEntity } from '../core/domain/entities/matchGame.entity'
import MatchGameDataEntity from './matchGameDataEntity'

export class MatchGameMapper {
  static toEntity (matchGame: MatchGameDataEntity): MatchGameEntity {
    const matchGameEntity: MatchGameEntity = {
      matchGameId: matchGame.matchGameId,
      boardId: matchGame.boardId,
      snakeId: matchGame.snakeId,
      foodId: matchGame.foodId,
      matchGameState: EMatchGameState[matchGame.matchGameState as EMatchGameState]
    }

    return matchGameEntity
  }

  static toDataEntity (matchGame: MatchGameEntity): MatchGameDataEntity {
    const matchGameDataEntity: MatchGameDataEntity = {
      matchGameId: matchGame.matchGameId,
      boardId: matchGame.boardId,
      snakeId: matchGame.snakeId,
      foodId: matchGame.foodId,
      matchGameState: matchGame.matchGameState
    }

    return matchGameDataEntity
  }
}
