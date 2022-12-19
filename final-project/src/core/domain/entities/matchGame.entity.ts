import { IMatchGame } from '../interfaces/IMatchGame'

export class MatchGameEntity implements IMatchGame {
  matchGameId: number
  boardId: number
  snakeId: number
  foodId: number

  constructor (matchId:number, boardId: number, snakeId: number, foodId: number) {
    this.matchGameId = matchId
    this.boardId = boardId
    this.snakeId = snakeId
    this.foodId = foodId
  }
}
