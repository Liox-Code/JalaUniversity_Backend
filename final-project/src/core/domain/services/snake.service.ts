import { inject, injectable } from 'inversify'
import { ISnakeHeadRepository } from '../repositories/ISnakeHead.repository'
import { TYPES } from '../../../type.core'
import { EDirection } from '../../../enums/EDirection'
import { ISnakeBodyRepository } from '../repositories/ISnakeBody.repository'
import { RandomGeneratorService } from './randomGeneratorService'
import { SnakeEntity } from '../entities/snake.entity'
import { SnakeBodyEntity } from '../entities/snakeBody.entity'

@injectable()
export class SnakeService {
  private readonly _snakeHeadRepo: ISnakeHeadRepository
  private readonly _snakeBodyRepo: ISnakeBodyRepository
  private readonly _randomGenerator: RandomGeneratorService
  constructor (
    @inject(TYPES.SnakeHeadTypeOrmRepository) snakeHeadRepo: ISnakeHeadRepository,
    @inject(TYPES.SnakeBodyTypeOrmRepository) snakeBodyRepo: ISnakeBodyRepository,
    @inject(TYPES.RandomGeneratorService) randomGenerator: RandomGeneratorService
  ) {
    this._snakeHeadRepo = snakeHeadRepo
    this._snakeBodyRepo = snakeBodyRepo
    this._randomGenerator = randomGenerator
  }

  async createSnakeHead (snakeId: number, limit: number) {
    const seed = snakeId
    const randonPosition = this._randomGenerator.generateRandomPosition(seed, limit)

    const snake: SnakeEntity = new SnakeEntity(snakeId, randonPosition, 1)

    return await this._snakeHeadRepo.createSnake(snake)
  }

  async readSnakeHead (snakeId: number) {
    return await this._snakeHeadRepo.readSnake(snakeId)
  }

  async eraseSnake (snakeId: number) {
    await this._snakeHeadRepo.eraseSnake(snakeId)
    await this._snakeBodyRepo.eraseSnakeBody(snakeId)
  }

  async getAllSnake (snakeId: number) {
    const snakeHeadReaded = await this._snakeHeadRepo.readSnake(snakeId)
    const snakeBodyReaded = await this._snakeBodyRepo.readSnakeBody(snakeId)
    return {
      snake: {
        snakeHeadReaded,
        snakeBodyReaded
      }
    }
  }

  async updateSnakeHead (snake: SnakeEntity) {
    return await this._snakeHeadRepo.updateSnake(snake)
  }

  async changeDirectionSnakeHead (snakeId: number, direction: EDirection) {
    const snake: SnakeEntity = await this.readSnakeHead(snakeId)
    snake.snakeDirection = direction
    await this._snakeHeadRepo.updateSnake(snake)
  }

  async moveAllSnake (snakeId: number, boardId: number) {
    await this.moveBodySnake(snakeId)
    await this.moveSnakeHead(snakeId, boardId)
  }

  async moveSnakeHead (snakeId: number, limit: number) {
    const currentSnake = await this.readSnakeHead(snakeId)

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

  async areTwoSnakesColliding (snakeHeadOne: SnakeEntity, snakeHeadTwo: SnakeEntity) {
    const inSameXAxis = snakeHeadOne.snakeHeadPosition.x === snakeHeadTwo.snakeHeadPosition.x
    const inSameYAxis = snakeHeadOne.snakeHeadPosition.y === snakeHeadTwo.snakeHeadPosition.y
    const isColliding = (inSameXAxis && inSameYAxis)
    return isColliding
  }

  async isCollidingSnake (snakeHead: SnakeEntity, snakeBody: SnakeBodyEntity[]) {
    const isColliding = snakeBody.some((snakeBodyItem) => {
      const inSameXAxis = snakeBodyItem.snakeBodyPosition.x === snakeHead.snakeHeadPosition.x
      const inSameYAxis = snakeBodyItem.snakeBodyPosition.y === snakeHead.snakeHeadPosition.y
      return (inSameXAxis && inSameYAxis)
    })

    return isColliding
  }
}
