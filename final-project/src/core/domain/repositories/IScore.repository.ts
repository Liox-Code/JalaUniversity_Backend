import { ScoreEntity } from '../entities/score.entity'

export type TScoreProps = {
  scoreId?: number
  matchGameId?: number
  userId?: number
  snakeId?: number
  score?: number
}

export type TScoreCriteria = {scoreId?: number, matchGameId?: number}

export interface IScoreRepository {
  createScore: (score: ScoreEntity) => Promise<ScoreEntity>
  findOneScoreWhere: (scoreCriteria: TScoreCriteria) => Promise<ScoreEntity >
  findAllScoresWhere: (scoreCriteria: TScoreCriteria) => Promise<ScoreEntity[]>
  updateScore: (score: TScoreProps) => Promise<ScoreEntity>
  eraseScore: (scoreId: number) => Promise<void>
}
