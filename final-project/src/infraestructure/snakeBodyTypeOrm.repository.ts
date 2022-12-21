import { FindManyOptions, Repository } from 'typeorm'
import { injectable } from 'inversify'
import 'reflect-metadata'
import SnakeBodyDataEntity from '../database/snakeBodyDataEntity'
import { SnakeBodyMapper } from '../database/snakeBodyMapper'
import { AppDataSource } from '../database/dataSource'
import { SnakeBodyEntity } from '../core/domain/entities/snakeBody.entity'
import { ISnakeBodyRepository } from '../core/domain/repositories/ISnakeBody.repository'

@injectable()
export class SnakeBodyTypeOrmRepository implements ISnakeBodyRepository {
  private readonly snakeBodyRepository: Repository<SnakeBodyDataEntity>

  constructor () {
    this.snakeBodyRepository = AppDataSource.getRepository(SnakeBodyDataEntity)
  }

  async createSnake (snakeId: number, snakeBody: SnakeBodyEntity) {
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
