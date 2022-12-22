import { ScoreEntity } from '../entities/score.entity'

export type TScoreProps = {
  scoreId?: number
  matchId?: number
  userId?: number
  score?: number
}

export type TScoreCriteria = {scoreId: number}

export interface IScoreRepository {
  createScore: (score: ScoreEntity) => Promise<ScoreEntity>
  findOneScoreWhere: (scoreCriteria: TScoreCriteria) => Promise<ScoreEntity >
  findAllScoresWhere: (scoreCriteria: TScoreCriteria) => Promise<ScoreEntity[]>
  updateScore: (score: TScoreProps) => Promise<ScoreEntity>
}
