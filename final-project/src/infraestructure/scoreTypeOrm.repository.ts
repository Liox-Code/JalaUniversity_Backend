import { injectable } from 'inversify'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import 'reflect-metadata'
import ScoreDataEntity from '../database/scoreDataEntity'
import { ScoreEntity } from '../core/domain/entities/score.entity'
import { IScoreRepository, TScoreCriteria, TScoreProps } from '../core/domain/repositories/IScore.repository'
import { ScoreMapper } from '../database/scoreMapper'
import { ObjectId } from 'mongodb'

@injectable()
export class ScoreTypeOrmRepository implements IScoreRepository {
  private readonly repository: Repository<ScoreDataEntity>

  constructor () {
    this.repository = AppDataSource.getMongoRepository(ScoreDataEntity)
  }

  async createScore (score: ScoreEntity): Promise<ScoreEntity> {
    const createdScore = await this.repository.save(ScoreMapper.toDataEntity(score))
    return ScoreMapper.toEntity(createdScore)
  }

  async findOneScoreWhere (criteria: TScoreCriteria): Promise<ScoreEntity> {
    const objectId = new ObjectId(criteria.scoreId)
    const foundScore = await this.repository.findOneBy({_id: objectId})
    if (!foundScore) {
      throw new Error(`Score with criteria ${criteria} not found`)
    }
    return ScoreMapper.toEntity(foundScore)
  }

  async findAllScoresWhere (criteria: TScoreCriteria): Promise<ScoreEntity[]> {
    const scoresData = await this.repository.findBy({ matchGameId: criteria.matchGameId })
    const scores = scoresData.map((score) => ScoreMapper.toEntity(score))
    return await scores
  }

  async getScoreRanking (matchGameId: number): Promise<ScoreEntity[]> {
    const objectId = new ObjectId(matchGameId)
    const options: FindManyOptions<ScoreDataEntity> = {
      where: { matchGameId: objectId },
      order: {
        score: 'DESC'
      }
    }
    const scoresData = await this.repository.find(options)
    const scores = scoresData.map((score) => ScoreMapper.toEntity(score))
    return scores
  }

  async updateScore (score: TScoreProps): Promise<ScoreEntity> {
    const objectId = new ObjectId(score.scoreId)
    await this.repository.update({ _id: objectId }, ScoreMapper.toDataEntity(score))
    const foundScore = await this.repository.findOneBy({ _id: objectId })
    if (!foundScore) {
      throw new Error(`updateScore not found after updated ${objectId} not found`)
    }
    return ScoreMapper.toEntity(foundScore)
  }

  async eraseScore (scoreId: number): Promise<void> {
    const objectId = new ObjectId(scoreId)
    const options: FindManyOptions<ScoreDataEntity> = {
      where: { _id: objectId }
    }
    const scoreDataBodyArray = await this.repository.find(options)
    await this.repository.remove(scoreDataBodyArray)
  }
}
