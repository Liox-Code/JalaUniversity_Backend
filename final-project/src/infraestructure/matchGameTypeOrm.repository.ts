import { injectable } from 'inversify'
import { MatchGameEntity } from '../core/domain/entities/matchGame.entity'
import { IMatchGameRepository, TMatchGameCriteria } from '../core/domain/repositories/IMatchGame.repository'
import 'reflect-metadata'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import { MatchGameMapper } from '../database/matchGameMapper'
import MatchGameDataEntity from '../database/matchGameDataEntity'
import { ObjectId } from 'mongodb'
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions'

@injectable()
export class MatchGameTypeOrmRepository implements IMatchGameRepository {
  private readonly repository: Repository<MatchGameDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(MatchGameDataEntity)
  }

  async createMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    const data = await this.repository.save(MatchGameMapper.toDataEntity(matchGame))
    // console.log(`data ${JSON.stringify(data, null, 3)}`)
    return await MatchGameMapper.toEntity(data)
  }

  async getAllMatchGame (): Promise<MatchGameEntity[]> {
    const foundMatchGameData = await this.repository.find()
    const foundMatchGameList = foundMatchGameData.map((matchGame) => MatchGameMapper.toEntity(matchGame))
    return foundMatchGameList
  }

  async getOneMatchGameByCriteria (matchGameId: number): Promise<MatchGameEntity> {
    if (!matchGameId) {
      throw new Error(`Match Game getOneMatchGameByCriteria() with id function receives and undefined matchGameId:${matchGameId}`)
    }
    // console.log(matchGameId)
    const objectId = new ObjectId(matchGameId)
    // const options: MongoFindManyOptions<MatchGameEntity> = {
    //   select: ['matchGameId', 'boardId', 'foodId', 'matchGameState'],
    //   where: { _id: objectId }
    // }
    const foundMatchGame = await this.repository.findOneBy({ _id: objectId })
    // console.log(foundMatchGame)
    if (!foundMatchGame) {
      throw new Error(`Match Game with id ${matchGameId} not found`)
    }
    return await MatchGameMapper.toEntity(foundMatchGame)
  }

  async getAllMatchGameByCriteria (criteria: TMatchGameCriteria): Promise<MatchGameEntity[]> {
    const objectId = new ObjectId(criteria.matchGameId)
    const foundMatchGameData = await this.repository.findBy({ _id: objectId })
    const foundMatchGameList = foundMatchGameData.map((matchGame) => MatchGameMapper.toEntity(matchGame))
    return foundMatchGameList
  }

  async updateMatchGame (matchGame: MatchGameEntity): Promise<MatchGameEntity> {
    const data = await this.repository.save(MatchGameMapper.toDataEntity(matchGame))
    return await MatchGameMapper.toEntity(data)
  }

  async eraseMatchGame (matchGameId: number): Promise<void> {
    const objectId = new ObjectId(matchGameId)
    const options: FindManyOptions<MatchGameDataEntity> = {
      where: { _id: objectId }
    }
    const matchGameDataBodyArray = await this.repository.find(options)
    await this.repository.remove(matchGameDataBodyArray)
  }
}
