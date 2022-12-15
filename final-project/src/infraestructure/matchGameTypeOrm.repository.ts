import { injectable } from 'inversify'
import { MatchGameEntity } from '../entities/matchGame.entity'
import { IMatchGameRepository } from '../repositories/IMatchGame.repository'
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
    const data = await this.repository.findOneBy({ snakeId: id })
    return await MatchGameMapper.toEntity(data)
  }

  async updateMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    const data = await this.repository.save(MatchGameMapper.toDataEntity(matchGame))
    return await MatchGameMapper.toEntity(data)
  }

  async deleteMatchGame (id: number): Promise<boolean> {
    return await false
  }
}
