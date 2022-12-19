import { MatchGameEntity } from '../entities/matchGame.entity'

export interface IMatchGameRepository {
  createMatchGame(matchGame: MatchGameEntity): Promise<MatchGameEntity>
  readMatchGame(id: number): Promise<MatchGameEntity>
  updateMatchGame(matchGame: MatchGameEntity): Promise<MatchGameEntity>
  deleteMatchGame(id: number): Promise<boolean>
}
