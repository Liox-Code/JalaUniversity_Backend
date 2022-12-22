import { injectable } from 'inversify'
import { MatchGameEntity } from '../core/domain/entities/matchGame.entity'
import { IMatchGameRepository } from '../core/domain/repositories/IMatchGame.repository'
import 'reflect-metadata'
import { Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import { MatchGameMapper } from '../database/matchGameMapper'
import MatchGameDataEntity from '../database/matchGameDataEntity'

@injectable()
export class MatchGameTypeOrmRepository implements IMatchGameRepository {
  private readonly repository: Repository<MatchGameDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(MatchGameDataEntity)
  }

  async createMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    const data = await this.repository.save(MatchGameMapper.toDataEntity(matchGame))
    return await MatchGameMapper.toEntity(data)
  }

  async readMatchGame (id: number): Promise<MatchGameEntity> {
    const foundMatchGame = await this.repository.findOneBy({ snakeId: id })
    if (!foundMatchGame) {
      throw new Error(`Match Game with id ${id} not found`)
    }
    return await MatchGameMapper.toEntity(foundMatchGame)
  }

  async updateMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    const data = await this.repository.save(MatchGameMapper.toDataEntity(matchGame))
    return await MatchGameMapper.toEntity(data)
  }

  async deleteMatchGame (id: number): Promise<boolean> {
    return await false
  }
}
