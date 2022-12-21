import { injectable } from 'inversify'
import { SnakeHeadEntity } from '../core/domain/entities/snakeHead.valueObject'
import { ISnakeRepository } from '../core/domain/repositories/ISnake.repository'
import 'reflect-metadata'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import SnakeDataEntity from '../database/snakeDataEntity'
import { SnakeMapper } from '../database/snakeMapper'
import SnakeBodyDataEntity from '../database/snakeBodyDataEntity'
import { SnakeBodyMapper } from '../database/snakeBodyMapper'
import { SnakeBodyEntity } from '../core/domain/entities/snakeBody.valueObject'
import { SnakeAggregate } from '../core/domain/aggregates/snake.aggregate'
import { ISnakeBodyRepository } from '../core/domain/repositories/ISnakeBody.repository'

@injectable()
export class SnakeTypeOrmRepository implements ISnakeBodyRepository {
  private readonly snakeRepository: Repository<SnakeDataEntity>
  private readonly snakeBodyRepository: Repository<SnakeBodyDataEntity>

  constructor () {
    this.snakeRepository = AppDataSource.getRepository(SnakeDataEntity)
    this.snakeBodyRepository = AppDataSource.getRepository(SnakeBodyDataEntity)
  }

  async createSnakeBody (snakeId: number, snakeBody: SnakeBodyEntity) {
    const data = await this.snakeBodyRepository.save(SnakeBodyMapper.toDataEntity(snakeId, snakeBody))
    return SnakeBodyMapper.toEntity(data)
  }

  async readSnakeBody (id: number) {
    const options: FindManyOptions<SnakeBodyDataEntity> = {
      where: { snakeId: id }
    }
    const snakeDataBodyArray = await this.snakeBodyRepository.find(options)
    const snakeBodyArray = snakeDataBodyArray.map((snakeDataBody) => { return SnakeBodyMapper.toEntity(snakeDataBody) })
    return snakeBodyArray
  }

  async updateSnakeBody (snakeId: number, snakeBody: SnakeBodyEntity) {
    const data = await this.snakeBodyRepository.save(SnakeBodyMapper.toDataEntity(snakeId, snakeBody))
    return SnakeBodyMapper.toEntity(data)
  }

  dieSnake () {
    console.log('die')
  }
}
