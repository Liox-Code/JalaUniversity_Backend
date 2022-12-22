import { inject, injectable } from 'inversify'
import { TYPES } from '../../../type.core'
import { ScoreEntity } from '../entities/score.entity'
import { IScoreRepository, TScoreCriteria } from '../repositories/IScore.repository'

@injectable()
export class ScoreService {
  private readonly _scoreRepo: IScoreRepository
  constructor (
    @inject(TYPES.ScoreTypeOrmRepository) scoreRepo: IScoreRepository
  ) {
    this._scoreRepo = scoreRepo
  }

  async createScore (score: ScoreEntity) {
    const scoreCreated = await this._scoreRepo.createScore(score)
    return scoreCreated
  }

  async getOneScoreFulfillCondition (criteria: TScoreCriteria): Promise<ScoreEntity> {
    const score = await this._scoreRepo.findOneScoreWhere(criteria)
    return score
  }

  async getAllScoresFulfillCondition (criteria: TScoreCriteria): Promise<ScoreEntity[]> {
    const allScores = await this._scoreRepo.findAllScoresWhere(criteria)
    return allScores
  }

  async updateScore (criteria: TScoreCriteria): Promise<ScoreEntity> {
    const score = await this._scoreRepo.updateScore(criteria)
    return score
  }
}
