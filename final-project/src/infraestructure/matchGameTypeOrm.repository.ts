import { injectable } from 'inversify'
import { MatchGameEntity } from '../core/domain/entities/matchGame.entity'
import { IMatchGameRepository, TMatchGameCriteria } from '../core/domain/repositories/IMatchGame.repository'
import 'reflect-metadata'
import { FindManyOptions, Repository } from 'typeorm'
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

  async getAllMatchGame (): Promise<MatchGameEntity[]> {
    const foundMatchGameData = await this.repository.find()
    const foundMatchGameList = foundMatchGameData.map((matchGame) => MatchGameMapper.toEntity(matchGame))
    return foundMatchGameList
  }

  async getOneMatchGameByCriteria (matchGameId: number): Promise<MatchGameEntity> {
    if (!matchGameId) {
      throw new Error(`Match Game getOneMatchGameByCriteria() receives and undefined matchGameId:${matchGameId}`)
    }
    const foundMatchGame = await this.repository.findOneBy({ matchGameId })
    if (!foundMatchGame) {
      throw new Error(`Match Game with id ${matchGameId} not found`)
    }
    return await MatchGameMapper.toEntity(foundMatchGame)
  }

  async getAllMatchGameByCriteria (criteria: TMatchGameCriteria): Promise<MatchGameEntity[]> {
    const foundMatchGameData = await this.repository.findBy(criteria)
    const foundMatchGameList = foundMatchGameData.map((matchGame) => MatchGameMapper.toEntity(matchGame))
    return foundMatchGameList
  }

  async updateMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    const data = await this.repository.save(MatchGameMapper.toDataEntity(matchGame))
    return await MatchGameMapper.toEntity(data)
  }

  async eraseMatchGame (matchGameId: number): Promise<void> {
    const options: FindManyOptions<MatchGameDataEntity> = {
      where: { matchGameId }
    }
    const matchGameDataBodyArray = await this.repository.find(options)
    await this.repository.remove(matchGameDataBodyArray)
  }
}
