import { IMatchGame } from '../interfaces/IMatchGame'

export enum EMatchGameState {
  Ready = 'Ready',
  Playing = 'Playing',
  Ended = 'Ended'
}

export class MatchGameEntity implements IMatchGame {
  matchGameId: number
  boardId: number
  snakeId: number
  foodId: number
  matchGameState?: EMatchGameState

  constructor (matchId:number, boardId: number, snakeId: number, foodId: number) {
    this.matchGameId = matchId
    this.boardId = boardId
    this.snakeId = snakeId
    this.foodId = foodId
    this.matchGameState = EMatchGameState.Ready
  }
}
