import { FindManyOptions, Repository } from 'typeorm'
import { injectable } from 'inversify'
import 'reflect-metadata'
import SnakeBodyDataEntity from '../database/snakeBodyDataEntity'
import { SnakeBodyMapper } from '../database/snakeBodyMapper'
import { AppDataSource } from '../database/dataSource'
import { SnakeBodyEntity } from '../core/domain/entities/snakeBody.entity'
import { ISnakeBodyRepository } from '../core/domain/repositories/ISnakeBody.repository'
import { ObjectId } from 'mongodb'

@injectable()
export class SnakeBodyTypeOrmRepository implements ISnakeBodyRepository {
  private readonly snakeBodyRepository: Repository<SnakeBodyDataEntity>

  constructor () {
    this.snakeBodyRepository = AppDataSource.getMongoRepository(SnakeBodyDataEntity)
  }

  async createSnake (snakeId: number, snakeBody: SnakeBodyEntity) {
    const objectId = new ObjectId(snakeId)
    const data = await this.snakeBodyRepository.save(SnakeBodyMapper.toDataEntity(objectId, snakeBody))
    return SnakeBodyMapper.toEntity(data)
  }

  async readSnakeBody (id: number) {
    const objectId = new ObjectId(id)
    const options: FindManyOptions<SnakeBodyDataEntity> = {
      where: { snakeId: objectId }
    }
    const snakeDataBodyArray = await this.snakeBodyRepository.find(options)
    const snakeBodyArray = snakeDataBodyArray.map((snakeDataBody) => { return SnakeBodyMapper.toEntity(snakeDataBody) })
    return snakeBodyArray
  }

  async updateSnakeBody (snakeId: number, snakeBody: SnakeBodyEntity) {
    const objectId = new ObjectId(snakeBody.snakeBodyIndex)
    const objectHeadId = new ObjectId(snakeId)
    await this.snakeBodyRepository.update({ _id: objectId }, SnakeBodyMapper.toDataEntity(objectHeadId, snakeBody))
    const foundSnakeBody = await this.snakeBodyRepository.findOneBy({ _id: objectId })
    if (!foundSnakeBody) {
      throw new Error(`updateSnakeBody not found after updated ${objectId} not found`)
    }
    return SnakeBodyMapper.toEntity(foundSnakeBody)
  }

  async eraseSnakeBody (snakeId: number) {
    const objectHeadId = new ObjectId(snakeId)
    const options: FindManyOptions<SnakeBodyDataEntity> = {
      where: { snakeId: objectHeadId }
    }
    const snakeDataBodyArray = await this.snakeBodyRepository.find(options)
    if(snakeDataBodyArray.length === 0){
      console.log('snakeDataBodyArray EMPTY [] in eraseSnakeBody')
      return
    }
    await this.snakeBodyRepository.remove(snakeDataBodyArray)
  }
}
