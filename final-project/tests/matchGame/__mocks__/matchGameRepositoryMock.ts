import { injectable } from 'inversify'
import 'reflect-metadata'
import { MatchGameEntity } from '../../../src/core/domain/entities/matchGame.entity'
import { IMatchGameRepository } from '../../../src/core/domain/repositories/IMatchGame.repository'
import { matchGamePropsMock } from './matchGamePropsMock'

@injectable()
export class MatchGameTypeOrmRepositoryMock implements IMatchGameRepository {
  async createMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    return await matchGame
  }

  async readMatchGame (id: number): Promise<MatchGameEntity> {
    throw new Error('Method not implemented.')
  }

  async updateMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    return await matchGame
  }

  async deleteMatchGame (id: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
