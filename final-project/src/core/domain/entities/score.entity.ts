export class ScoreEntity {
  scoreId: number
  matchId: number
  userId: number
  score: number

  constructor (
    scoreId: number,
    matchId: number,
    userId: number,
    score: number
  ) {
    this.scoreId = scoreId
    this.matchId = matchId
    this.userId = userId
    this.score = score
  }
}
