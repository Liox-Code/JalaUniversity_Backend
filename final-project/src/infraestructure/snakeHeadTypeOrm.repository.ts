import { injectable } from 'inversify'
import { SnakeEntity } from '../core/domain/entities/snake.entity'
import { ISnakeHeadRepository } from '../core/domain/repositories/ISnakeHead.repository'
import 'reflect-metadata'
import { FindManyOptions, Repository } from 'typeorm'
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

  async readSnake (id: number): Promise<SnakeEntity> {
    const foundSnake = await this.snakeRepository.findOneBy({ snakeId: id })
    if (!foundSnake) {
      throw new Error(`Snake with id ${id} not found`)
    }
    return SnakeMapper.toEntity(foundSnake)
  }

  async updateSnake (snake: SnakeEntity) {
    const data = await this.snakeRepository.save(SnakeMapper.toDataEntity(snake))
    return SnakeMapper.toEntity(data)
  }

  async eraseSnake (snakeId: number) {
    const options: FindManyOptions<SnakeDataEntity> = {
      where: { snakeId }
    }
    const snakeDataBodyArray = await this.snakeRepository.find(options)
    await this.snakeRepository.remove(snakeDataBodyArray)
  }
}
