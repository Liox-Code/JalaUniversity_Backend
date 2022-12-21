import { inject, injectable } from 'inversify'
import { ISnakeHeadRepository } from '../repositories/ISnakeHead.repository'
import { TYPES } from '../../../type.core'
import { EDirection } from '../../../enums/EDirection'
import { ISnakeBodyRepository } from '../repositories/ISnakeBody.repository'
import { IBoardRepository } from '../repositories/IBoard.repository'
import { RandomGeneratorService } from './randomGeneratorService'
import { SnakeEntity } from '../entities/snake.entity'
import { SnakeBodyEntity } from '../entities/snakeBody.entity'

@injectable()
export class SnakeService {
  private readonly _snakeHeadRepo: ISnakeHeadRepository
  private readonly _snakeBodyRepo: ISnakeBodyRepository
  private readonly _boardRepo: IBoardRepository
  private readonly _randomGenerator: RandomGeneratorService
  constructor (
    @inject(TYPES.SnakeHeadTypeOrmRepository) snakeHeadRepo: ISnakeHeadRepository,
    @inject(TYPES.SnakeBodyTypeOrmRepository) snakeBodyRepo: ISnakeBodyRepository,
    @inject(TYPES.BoardTypeOrmRepository) boardRepo: IBoardRepository,
    @inject(TYPES.RandomGeneratorService) randomGenerator: RandomGeneratorService
  ) {
    this._snakeHeadRepo = snakeHeadRepo
    this._snakeBodyRepo = snakeBodyRepo
    this._boardRepo = boardRepo
    this._randomGenerator = randomGenerator
  }

  async createSnakeHead (snakeId: number) {
    const seed = snakeId
    const limit = await (await this._boardRepo.readBoard(snakeId)).boardSize
    const randonPosition = this._randomGenerator.generateRandomPosition(seed, limit)

    const snake: SnakeEntity = new SnakeEntity(snakeId, randonPosition, 1)

    return await this._snakeHeadRepo.createSnake(snake)
  }

  async readSnakeHead (snakeId: number) {
    return await this._snakeHeadRepo.readSnake(snakeId)
  }

  async updateSnakeHead (snake: SnakeEntity) {
    return await this._snakeHeadRepo.updateSnake(snake)
  }

  async changeDirectionSnakeHead (snakeId: number, direction: EDirection) {
    const snake: SnakeEntity = await this.readSnakeHead(snakeId)
    snake.snakeDirection = direction
    await this._snakeHeadRepo.updateSnake(snake)
  }

  async moveAllSnake (snakeId: number) {
    await this.moveBodySnake(snakeId)
    await this.moveSnakeHead(snakeId)
  }

  async moveSnakeHead (snakeId: number) {
    const currentSnake = await this.readSnakeHead(snakeId)
    const limit = await (await this._boardRepo.readBoard(snakeId)).boardSize
    const nextPosition = await this.getNextPosition(currentSnake, limit)
    currentSnake.snakeHeadPosition = nextPosition

    await this._snakeHeadRepo.updateSnake(currentSnake)
  }

  async getNextPosition (snake: SnakeEntity, limit: number) {
    const directionsList = {
      [EDirection.UP]: { x: 0, y: 1 },
      [EDirection.DOWN]: { x: 0, y: -1 },
      [EDirection.RIGHT]: { x: 1, y: 0 },
      [EDirection.LEFT]: { x: -1, y: 0 }
    }
    snake.snakeHeadPosition.x += directionsList[snake.snakeDirection].x
    snake.snakeHeadPosition.y += directionsList[snake.snakeDirection].y
    snake.snakeHeadPosition.x = (snake.snakeHeadPosition.x >= limit) ? 0 : snake.snakeHeadPosition.x
    snake.snakeHeadPosition.y = (snake.snakeHeadPosition.y >= limit) ? 0 : snake.snakeHeadPosition.y
    snake.snakeHeadPosition.x = (snake.snakeHeadPosition.x < 0) ? (limit - 1) : snake.snakeHeadPosition.x
    snake.snakeHeadPosition.y = (snake.snakeHeadPosition.y < 0) ? (limit - 1) : snake.snakeHeadPosition.y
    return await snake.snakeHeadPosition
  }

  async growSnake (snakeId: number) {
    const newSize = await this.growSizeSnake(snakeId)
    const newNode = await this.createNodeSnake(snakeId)
    const growSnake = {
      newSize,
      newNode
    }
    return growSnake
  }

  async growSizeSnake (snakeId: number) {
    const currentSnake = await this.readSnakeHead(snakeId)
    currentSnake.snakeSize = currentSnake.snakeSize + 1
    return await this._snakeHeadRepo.updateSnake(currentSnake)
  }

  async createNodeSnake (snakeId: number) {
    const currentSnake = await this.readSnakeHead(snakeId)
    const snakeNodesList = await this._snakeBodyRepo.readSnakeBody(snakeId)
    const snakeBody = new SnakeBodyEntity(snakeNodesList.length, currentSnake.snakeHeadPosition)
    return await this._snakeBodyRepo.createSnake(snakeId, snakeBody)
  }

  async readNodeSnake (snakeId: number) {
    const snakeNodesList = await this._snakeBodyRepo.readSnakeBody(snakeId)
    return await snakeNodesList
  }

  async moveBodySnake (snakeId: number) {
    const currentSnake = await this.readSnakeHead(snakeId)
    const snakeBodyList = await this._snakeBodyRepo.readSnakeBody(snakeId)
    const promises = snakeBodyList.reverse().map(async (snakeBodyItem, index) => {
      if (index === snakeBodyList.length - 1) {
        snakeBodyItem.snakeBodyPosition = currentSnake.snakeHeadPosition
        return this._snakeBodyRepo.updateSnakeBody(currentSnake.snakeId, snakeBodyItem)
      } else {
        snakeBodyItem.snakeBodyPosition = snakeBodyList[index + 1].snakeBodyPosition
        return this._snakeBodyRepo.updateSnakeBody(currentSnake.snakeId, snakeBodyItem)
      }
    })
    await Promise.all(promises)
  }

  async isCollidingSnake (snakeId: number) {
    const currentSnake = await this.readSnakeHead(snakeId)
    const snakeBodyList = await this._snakeBodyRepo.readSnakeBody(snakeId)
    const isColliding = snakeBodyList.some((snakeBodyItem) => {
      const inSameXAxis = snakeBodyItem.snakeBodyPosition.x === currentSnake.snakeHeadPosition.x
      const inSameYAxis = snakeBodyItem.snakeBodyPosition.y === currentSnake.snakeHeadPosition.y
      return (inSameXAxis && inSameYAxis)
    })
    return isColliding
  }
}
