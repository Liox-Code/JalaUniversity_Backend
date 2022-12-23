import { EMatchGameState, MatchGameEntity } from '../entities/matchGame.entity'

export type TMatchGameProps = {
  matchGameId: number
  boardId: number
  foodId: number
  matchGameState: EMatchGameState
}

export type TMatchGameCriteria = {matchGameId?: number}
export interface IMatchGameRepository {
  createMatchGame(matchGame: MatchGameEntity): Promise<MatchGameEntity>
  getAllMatchGame (): Promise<MatchGameEntity[]>
  getOneMatchGameByCriteria(matchGameId: number): Promise<MatchGameEntity>
  getAllMatchGameByCriteria (criteria: TMatchGameCriteria): Promise<MatchGameEntity[]>
  updateMatchGame(matchGame: MatchGameEntity): Promise<MatchGameEntity>
  eraseMatchGame: (matchGameId: number) => Promise<void>
}
