import { IMatchGame } from '../interfaces/IMatchGame'

export class MatchGameEntity implements IMatchGame {
  matchGameId: number
  boardId: number
  snakeId: number

  constructor (matchId:number, boardId: number, snakeId: number) {
    this.matchGameId = matchId
    this.boardId = boardId
    this.snakeId = snakeId
  }
}
