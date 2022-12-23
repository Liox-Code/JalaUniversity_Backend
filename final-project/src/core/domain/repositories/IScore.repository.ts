import { ScoreEntity } from '../entities/score.entity'

export type TScoreProps = {
  scoreId?: number
  score?: number
}

export type TScoreCriteria = {scoreId?: number, matchGameId?: number, snakeId?: number, score?:number}

export interface IScoreRepository {
  createScore: (score: ScoreEntity) => Promise<ScoreEntity>
  findOneScoreWhere: (scoreCriteria: TScoreCriteria) => Promise<ScoreEntity >
  findAllScoresWhere: (scoreCriteria: TScoreCriteria) => Promise<ScoreEntity[]>
  getScoreRanking: (matchGameId: number) => Promise<ScoreEntity[]>
  updateScore: (score: TScoreProps) => Promise<ScoreEntity>
  eraseScore: (scoreId: number) => Promise<void>
}
