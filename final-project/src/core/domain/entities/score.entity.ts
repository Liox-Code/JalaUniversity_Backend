export class ScoreEntity {
  scoreId: number
  matchGameId: number
  userId: number
  snakeId: number
  score: number

  constructor (
    scoreId: number,
    matchGameId: number,
    userId: number,
    snakeId: number,
    score: number
  ) {
    this.scoreId = scoreId
    this.matchGameId = matchGameId
    this.userId = userId
    this.snakeId = snakeId
    this.score = score
  }
}
