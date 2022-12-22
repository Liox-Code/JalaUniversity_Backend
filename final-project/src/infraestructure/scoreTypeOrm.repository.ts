import { injectable } from 'inversify'
import { Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import 'reflect-metadata'
import ScoreDataEntity from '../database/scoreDataEntity'
import { ScoreEntity } from '../core/domain/entities/score.entity'
import { IScoreRepository, TScoreCriteria, TScoreProps } from '../core/domain/repositories/IScore.repository'
import { ScoreMapper } from '../database/scoreMapper'

@injectable()
export class ScoreTypeOrmRepository implements IScoreRepository {
  private readonly repository: Repository<ScoreDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(ScoreDataEntity)
  }

  async createScore (score: ScoreEntity): Promise<ScoreEntity> {
    const createdScore = await this.repository.save(ScoreMapper.toDataEntity(score))
    return ScoreMapper.toEntity(createdScore)
  }

  async findOneScoreWhere (criteria: TScoreCriteria): Promise<ScoreEntity> {
    const foundScore = await this.repository.findOneBy(criteria)
    if (!foundScore) {
      throw new Error(`Score with criteria ${criteria} not found`)
    }
    return ScoreMapper.toEntity(foundScore)
  }

  async findAllScoresWhere (criteria: TScoreCriteria): Promise<ScoreEntity[]> {
    return await this.repository.findBy(criteria)
  }

  async updateScore (score: TScoreProps): Promise<ScoreEntity> {
    const updatedScore = await this.repository.save(score)
    return ScoreMapper.toEntity(updatedScore)
  }
}
