import { injectable } from 'inversify'
import 'reflect-metadata'
import { MatchGameEntity } from '../../../src/core/domain/entities/matchGame.entity'
import { IMatchGameRepository, TMatchGameCriteria } from '../../../src/core/domain/repositories/IMatchGame.repository'

@injectable()
export class MatchGameTypeOrmRepositoryMock implements IMatchGameRepository {
  async getOneMatchGameByCriteria (id: number): Promise<MatchGameEntity> {
    throw new Error('Method not implemented.')
  }

  async updateMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    return await matchGame
  }

  async eraseMatchGame (id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getAllMatchGame (): Promise<MatchGameEntity[]> {
    throw new Error('Method not implemented.')
  }

  async getAllMatchGameByCriteria (criteria: TMatchGameCriteria): Promise<MatchGameEntity[]> {
    throw new Error('Method not implemented.')
  }

  async createMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    return await matchGame
  }
}
