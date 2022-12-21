import { injectable } from 'inversify'
import { ISnakeRepository } from '../core/domain/repositories/ISnake.repository'
import 'reflect-metadata'
import { AppDataSource } from '../database/dataSource'
import SnakeDataEntity from '../database/snakeDataEntity'
import { SnakeMapper } from '../database/snakeMapper'
import SnakeBodyDataEntity from '../database/snakeBodyDataEntity'
import { SnakeBodyMapper } from '../database/snakeBodyMapper'
import { SnakeAggregate } from '../core/domain/aggregates/snake.aggregate'
import { Repository } from 'typeorm'

@injectable()
export class SnakeTypeOrmRepository implements ISnakeRepository {
  private readonly snakeRepository: Repository<SnakeDataEntity>
  private readonly snakeBodyRepository: Repository<SnakeBodyDataEntity>

  constructor () {
    this.snakeRepository = AppDataSource.getRepository(SnakeDataEntity)
    this.snakeBodyRepository = AppDataSource.getRepository(SnakeBodyDataEntity)
  }

  async createSnake (snake: SnakeAggregate) {
    await this.snakeRepository.save(SnakeMapper.toDataEntity(snake))
  }

  async readSnake (id: number) {
    const snakeDBEntity = await this.snakeRepository.findOneBy({ snakeId: id })
    const snakeId = snakeDBEntity.snakeId
    const snake = SnakeMapper.toEntity(snakeDBEntity)
    return { snakeId, snake }
  }

  async updateSnake (snake: SnakeAggregate) {
    await this.snakeRepository.save(SnakeMapper.toDataEntity(snake))
  }
}
