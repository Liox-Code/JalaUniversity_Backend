import { ScoreEntity } from '../core/domain/entities/score.entity'
import ScoreDataEntity from './scoreDataEntity'

export class ScoreMapper {
  static toEntity (score: ScoreDataEntity): ScoreEntity {
    const scoreEntity: ScoreEntity = {
      scoreId: score._id,
      userId: score.userId,
      matchGameId: score.matchGameId,
      snakeId: score.snakeId,
      score: score.score
    }

    return scoreEntity
  }

  static toDataEntity (score: ScoreEntity): ScoreDataEntity {
    const scoreDataEntity: ScoreDataEntity = {
      scoreId: score.scoreId,
      userId: score.userId,
      matchGameId: score.matchGameId,
      snakeId: score.snakeId,
      score: score.score
    }

    return scoreDataEntity
  }
}
