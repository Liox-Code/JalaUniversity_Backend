import { injectable } from 'inversify'
import { SnakeEntity } from '../core/domain/entities/snake.entity'
import { ISnakeHeadRepository } from '../core/domain/repositories/ISnakeHead.repository'
import 'reflect-metadata'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import SnakeDataEntity from '../database/snakeDataEntity'
import { SnakeMapper } from '../database/snakeMapper'
import { ObjectId } from 'mongodb'

@injectable()
export class SnakeHeadTypeOrmRepository implements ISnakeHeadRepository {
  private readonly snakeRepository: Repository<SnakeDataEntity>

  constructor () {
    this.snakeRepository = AppDataSource.getMongoRepository(SnakeDataEntity)
  }

  async createSnake (snake: SnakeEntity) {
    const data = await this.snakeRepository.save(SnakeMapper.toDataEntity(snake))
    return SnakeMapper.toEntity(data)
  }

  async readSnake (id: number): Promise<SnakeEntity> {
    const objectId = new ObjectId(id)
    const foundSnake = await this.snakeRepository.findOneBy({ _id: objectId })
    if (!foundSnake) {
      throw new Error(`Snake with id ${id} not found`)
    }
    return SnakeMapper.toEntity(foundSnake)
  }

  async updateSnake (snake: SnakeEntity) {
    const objectId = new ObjectId(snake.snakeId)
    await this.snakeRepository.update({ _id: objectId }, SnakeMapper.toDataEntity(snake))
    const foundSnake = await this.snakeRepository.findOneBy({ _id: objectId })
    if (!foundSnake) {
      throw new Error(`updateSnake not found after updated ${objectId} not found`)
    }
    return SnakeMapper.toEntity(foundSnake)
  }

  async eraseSnake (snakeId: number) {
    const objectId = new ObjectId(snakeId)
    const options: FindManyOptions<SnakeDataEntity> = {
      where: { _id: objectId }
    }
    const snakeDataBodyArray = await this.snakeRepository.find(options)
    await this.snakeRepository.remove(snakeDataBodyArray)
  }
}
