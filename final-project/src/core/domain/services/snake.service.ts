import { inject, injectable } from 'inversify'
import { ISnakeHeadRepository } from '../repositories/ISnakeHead.repository'
import { TYPES } from '../../../type.core'
import { EDirection } from '../../../enums/EDirection'
import { SnakeHeadEntity } from '../entities/snakeHead.valueObject'
import { SnakeAggregate } from '../aggregates/snake.aggregate'
import { SnakeBodyEntity } from '../entities/snakeBody.valueObject'
import { RandomGeneratorService } from './RandomGeneratorService'
import { BoardService } from './board.service'

@injectable()
export class SnakeService {
  private readonly _snakeHead: ISnakeHeadRepository
  private readonly _randomGenerator: RandomGeneratorService
  private readonly _boardService: BoardService
  constructor (
    @inject(TYPES.SnakeHeadTypeOrmRepository) snakeHead: ISnakeHeadRepository,
    @inject(TYPES.RandomGeneratorService) randomGenerator: RandomGeneratorService,
    @inject(TYPES.BoardService) boardService: BoardService
  ) {
    this._snakeHead = snakeHead
    this._randomGenerator = randomGenerator
    this._boardService = boardService
  }

  async createSnake (snakeId: number, boardSize: number) {
    const seed = snakeId
    const limit = boardSize
    const randonPosition = this._randomGenerator.generateRandomPosition(seed, limit)

    const snake: SnakeHeadEntity = new SnakeHeadEntity(randonPosition)
    const snakeBody: SnakeBodyEntity = new SnakeBodyEntity(randonPosition)
    const snakeAggregate = this._snakeHead.createSnake()
    return await this._snakeHead.createSnake(snake)
  }

  async updateSnake (snake: SnakeHeadEntity) {
    return await this._snakeHead.updateSnake(snake)
  }

  async moveSnakeHead (snakeId: number) {
    // const snakeDBEntity = await this.snakeRepository.findOneBy({ snakeId: id })
    // const snakeBodyDBEntityList = await this.snakeBodyRepository.findBy({ snakeId: id })
    // const snakeId = snakeDBEntity.snakeId
    // const snake = SnakeMapper.toEntity(snakeDBEntity)
    // const snakeBody = snakeBodyDBEntityList.map((snakeBodyDBEntity) => SnakeBodyMapper.toEntity(snakeBodyDBEntity))
    // const snakeAggregate = new SnakeAggregate(snakeId, snake, snakeBody)
    const snakeHead: SnakeHeadEntity = await this._snakeHead.readSnake(snakeId)
    snakeHead.snakeDirection = direction
    const snakeNewPosition = await this.snakeService.updateSnake(snakeHead)
    return await this._snakeHead.readSnake(id)
  }

  async moveSnake (direction: EDirection, snake: SnakeHeadEntity, limit: number) {
    let currentSnake = await this.moveSnakeHead(snake.snakeId)
    currentSnake = await this.moveHeadSnake(direction, currentSnake, limit)

    let snakeAggregate = new SnakeAggregate(snake.snakeId, currentSnake)
    snakeAggregate = new SnakeAggregate(snake.snakeId, currentSnake)
    const snakeReaded = await this._snakeHead.readSnakeBody(snake.snakeId)
    for (const snakeBodyItem of snakeReaded) {
      snakeAggregate.addSnakeBody(snakeBodyItem)
    }

    const snakeBodyArray = await this.moveBodySnake(snakeAggregate)
    return await snakeAggregate
  }

  async moveHeadSnake (direction: EDirection, snake: SnakeHeadEntity, limit: number) {
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

  async moveBodySnake (snake: SnakeAggregate) {
    return await snake.snakeBody.map(async (snakeBodyItem, index) => {
      if (index === 1) {
        const newPosition = new SnakeBodyEntity(snake.snakeId, snake.snakeHead.snakeHeadPosition)
        return await this._snakeHead.updateSnakeBody(snake.snakeId, newPosition)
      } else {
        const newPosition = snake.snakeBody[index - 1]
        return await this._snakeHead.updateSnakeBody(snake.snakeId, newPosition)
      }
    })
  }

  async growSnake (snakeHeadId:number) {
    const currentSnake = await this.moveSnakeHead(snakeHeadId)
    const snake = new SnakeAggregate(snakeHeadId, currentSnake)
    const snakeBodyArray = await this._snakeHead.readSnakeBody(snakeHeadId)
    for (const snakeBodyItem of snakeBodyArray) {
      snake.addSnakeBody(snakeBodyItem)
    }
    const snakeBody = new SnakeBodyEntity(snake.snakeBody.length, currentSnake.snakeHeadPosition)
    await this._snakeHead.growSnake(snake.snakeId, snakeBody)
    snake.addSnakeBody(snakeBody)

    return snake
  }

  async readSnake () {
    const snakeDBEntity = await this.snakeRepository.findOneBy({ snakeId: id })
    const snakeBodyDBEntityList = await this.snakeBodyRepository.findBy({ snakeId: id })
    const snakeId = snakeDBEntity.snakeId
    const snake = SnakeMapper.toEntity(snakeDBEntity)
    const snakeBody = snakeBodyDBEntityList.map((snakeBodyDBEntity) => SnakeBodyMapper.toEntity(snakeBodyDBEntity))
    const snakeAggregate = new SnakeAggregate()
    snakeAggregate.snakeId = snakeId
    snakeAggregate.snakeHead = snake
    snakeAggregate.snakeBody = [...snakeBody]
    return snakeAggregate
  }
}
