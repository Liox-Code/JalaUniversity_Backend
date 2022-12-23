export enum EMatchGameState {
  Ready = 'Ready',
  Playing = 'Playing',
  Ended = 'Ended'
}

export interface IMatchGame {
  matchGameId: number
  boardId: number
  foodId: number
  matchGameState: EMatchGameState
}

export class MatchGameEntity implements IMatchGame {
  matchGameId: number
  boardId: number
  foodId: number
  matchGameState: EMatchGameState

  constructor (matchGameId:number, boardId: number, foodId: number) {
    this.matchGameId = matchGameId
    this.boardId = boardId
    this.foodId = foodId
    this.matchGameState = EMatchGameState.Ready
  }
}
