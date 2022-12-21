import { injectable } from 'inversify'
import { SnakeEntity } from '../core/domain/entities/snake.entity'
import { ISnakeHeadRepository } from '../core/domain/repositories/ISnakeHead.repository'
import 'reflect-metadata'
import { Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import SnakeDataEntity from '../database/snakeDataEntity'
import { SnakeMapper } from '../database/snakeMapper'

@injectable()
export class SnakeHeadTypeOrmRepository implements ISnakeHeadRepository {
  private readonly snakeRepository: Repository<SnakeDataEntity>

  constructor () {
    this.snakeRepository = AppDataSource.getRepository(SnakeDataEntity)
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
}
