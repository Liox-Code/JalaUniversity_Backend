import { inject, injectable } from 'inversify'
import { MatchGameEntity } from '../entities/matchGame.entity'
import { IMatchGameRepository } from '../repositories/IMatchGame.repository'
import { TYPES } from '../type.core'

@injectable()
export class MatchGameService {
  private matchGame: IMatchGameRepository
  constructor (@inject(TYPES.MatchGameTypeOrm) matchGame: IMatchGameRepository) {
    this.matchGame = matchGame
  }

  async createMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    return await this.matchGame.createMatchGame(matchGame)
  }

  async readMatchGame (id: number): Promise<MatchGameEntity> {
    return await this.matchGame.readMatchGame(id)
  }

  async updateMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    return await this.matchGame.updateMatchGame(matchGame)
  }

  async deleteMatchGame (id: number): Promise<boolean> {
    return await this.matchGame.deleteMatchGame(id)
  }
}
