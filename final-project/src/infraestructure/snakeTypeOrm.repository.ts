import { injectable } from 'inversify'
import { SnakeHeadEntity } from '../core/domain/entities/snakeHead.entity'
import { ISnakeRepository } from '../core/domain/repositories/ISnakeHead.repository'
import 'reflect-metadata'
import { EDirection } from '../enums/EDirection'
import { Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import SnakeHeadDataEntity from '../database/snakeHeadDataEntity'
import { SnakeMapper } from '../database/snakeHeadMapper'

@injectable()
export class SnakeTypeOrmRepository implements ISnakeRepository {
  private readonly repository: Repository<SnakeHeadDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(SnakeHeadDataEntity)
  }

  async initialDB () {
    await AppDataSource.initialize()
  }

  async createSnake (snake: SnakeHeadEntity) {
    const data = await this.repository.save(SnakeMapper.toDataEntity(snake))
    return SnakeMapper.toEntity(data)
  }

  async readSnake (id: number) {
    const data = await this.repository.findOneBy({ snakeId: id })
    return SnakeMapper.toEntity(data)
  }

  async moveSnake (direction: EDirection, snake: SnakeHeadEntity, limit: number) {
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

  async updateSnake (snake: SnakeHeadEntity) {
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
