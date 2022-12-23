import { injectable } from 'inversify'
import 'reflect-metadata'
import { ScoreEntity } from '../../../src/core/domain/entities/score.entity'
import { IScoreRepository, TScoreCriteria, TScoreProps } from '../../../src/core/domain/repositories/IScore.repository'
import { scorePropsMock } from './scorePropsMock'

@injectable()
export class ScoreTypeOrmRepositoryMock implements IScoreRepository {
  async createScore (score: ScoreEntity) : Promise<ScoreEntity> {
    return await score
  }

  async findOneScoreWhere (scoreCriteria: TScoreCriteria) : Promise<ScoreEntity> {
    const { scoreId, matchGameId, userId, snakeId, score } = scorePropsMock
    const scoreData = new ScoreEntity(scoreId, matchGameId, userId, snakeId, score)
    return await scoreData
  }

  async findAllScoresWhere (scoreCriteria: TScoreCriteria) : Promise<ScoreEntity[]> {
    const { scoreId, matchGameId, userId, snakeId, score } = scorePropsMock
    const scoreData = new ScoreEntity(scoreId, matchGameId, userId, snakeId, score)
    return await [scoreData, scoreData]
  }

  async getScoreRanking (matchGameIdParam: number) : Promise<ScoreEntity[]> {
    const { scoreId, matchGameId, userId, snakeId, score } = scorePropsMock
    const scoreData = new ScoreEntity(scoreId, matchGameId, userId, snakeId, score)
    return await [scoreData, scoreData]
  }

  async updateScore (scoreParam: TScoreProps) : Promise<ScoreEntity> {
    const { scoreId, matchGameId, userId, snakeId, score } = scorePropsMock
    const scoreData = new ScoreEntity(scoreId, matchGameId, userId, snakeId, score)
    return await scoreData
  }

  async eraseScore (scoreId: number) : Promise<void> {
    await console.log(scoreId)
  }
}
