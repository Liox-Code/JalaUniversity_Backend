import { injectable } from 'inversify'
import { SnakeEntity } from '../core/domain/entities/snake.entity'
import { ISnakeRepository } from '../core/domain/repositories/ISnakeHead.repository'
import 'reflect-metadata'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import SnakeDataEntity from '../database/snakeDataEntity'
import { SnakeMapper } from '../database/snakeMapper'
import SnakeBodyDataEntity from '../database/snakeBodyDataEntity'
import { SnakeBodyMapper } from '../database/snakeBodyMapper'
import { SnakeBodyEntity } from '../core/domain/entities/snakeBody.entity'

@injectable()
export class SnakeTypeOrmRepository implements ISnakeRepository {
  private readonly snakeRepository: Repository<SnakeDataEntity>
  private readonly snakeBodyRepository: Repository<SnakeBodyDataEntity>

  constructor () {
    this.snakeRepository = AppDataSource.getRepository(SnakeDataEntity)
    this.snakeBodyRepository = AppDataSource.getRepository(SnakeBodyDataEntity)
  }

  async createSnake (snake: SnakeEntity) {
    const data = await this.snakeRepository.save(SnakeMapper.toDataEntity(snake))
    return SnakeMapper.toEntity(data)
  }

  async readSnake (id: number) {
    const data = await this.snakeRepository.findOneBy({ snakeId: id })
    return SnakeMapper.toEntity(data)
  }

  async updateSnake (snake: SnakeEntity) {
    const data = await this.snakeRepository.save(SnakeMapper.toDataEntity(snake))
    return SnakeMapper.toEntity(data)
  }

  async growSnake (snakeId: number, snakeBody: SnakeBodyEntity) {
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
