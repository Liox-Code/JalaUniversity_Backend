import { injectable } from 'inversify'
import { SnakeEntity } from '../core/domain/entities/snake.entity'
import { ISnakeRepository } from '../core/domain/repositories/ISnake.repository'
import 'reflect-metadata'
import { EDirection } from '../enums/EDirection'
import { Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import SnakeDataEntity from '../database/snakeDataEntity'
import { SnakeMapper } from '../database/snakeMapper'

@injectable()
export class SnakeTypeOrmRepository implements ISnakeRepository {
  private readonly repository: Repository<SnakeDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(SnakeDataEntity)
  }

  async initialDB () {
    await AppDataSource.initialize()
  }

  async createSnake (snake: SnakeEntity) {
    const data = await this.repository.save(SnakeMapper.toDataEntity(snake))
    return SnakeMapper.toEntity(data)
  }

  async readSnake (id: number) {
    const data = await this.repository.findOneBy({ snakeId: id })
    return SnakeMapper.toEntity(data)
  }

  async moveSnake (direction: EDirection, snake: SnakeEntity, limit: number) {
    const directionsList = {
      [EDirection.UP]: { x: 0, y: 1 },
      [EDirection.DOWN]: { x: 0, y: -1 },
      [EDirection.RIGHT]: { x: 1, y: 0 },
      [EDirection.LEFT]: { x: -1, y: 0 }
    }
    snake.snakeHeadPosition.x += directionsList[direction].x
    snake.snakeHeadPosition.y += directionsList[direction].y
    snake.snakeHeadPosition.x = (snake.snakeHeadPosition.x >= limit) ? 0 : snake.snakeHeadPosition.x
    snake.snakeHeadPosition.y = (snake.snakeHeadPosition.y >= limit) ? 0 : snake.snakeHeadPosition.y
    snake.snakeHeadPosition.x = (snake.snakeHeadPosition.x < 0) ? (limit - 1) : snake.snakeHeadPosition.x
    snake.snakeHeadPosition.y = (snake.snakeHeadPosition.y < 0) ? (limit - 1) : snake.snakeHeadPosition.y
    return await snake
  }

  async updateSnake (snake: SnakeEntity) {
    const data = await this.repository.save(SnakeMapper.toDataEntity(snake))
    return SnakeMapper.toEntity(data)
  }

  grow () {
    console.log('grow')
  }

  die () {
    console.log('die')
  }
}
