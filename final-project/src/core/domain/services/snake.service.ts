import { inject, injectable } from 'inversify'
import { ISnakeRepository } from '../repositories/ISnakeHead.repository'
import { TYPES } from '../../../type.core'
import { EDirection } from '../../../enums/EDirection'
import { SnakeEntity } from '../entities/snake.entity'
import { SnakeAggregate } from '../aggregates/snake.aggregate'
import { SnakeBodyEntity } from '../entities/snakeBody.entity'

@injectable()
export class SnakeService {
  private readonly snakeHead: ISnakeRepository
  constructor (
    @inject(TYPES.SnakeHeadTypeOrmRepository) snakeHead: ISnakeRepository
  ) {
    this.snakeHead = snakeHead
  }

  async createSnake (snake: SnakeEntity) {
    return await this.snakeHead.createSnake(snake)
  }

  async readSnake (id: number) {
    return await this.snakeHead.readSnake(id)
  }

  async updateSnake (snake: SnakeEntity) {
    return await this.snakeHead.updateSnake(snake)
  }

  async moveSnake (direction: EDirection, snake: SnakeEntity, limit: number) {
    let currentSnake = await this.readSnake(snake.snakeId)
    currentSnake = await this.moveHeadSnake(direction, currentSnake, limit)

    let snakeAggregate = new SnakeAggregate(snake.snakeId, currentSnake)
    snakeAggregate = new SnakeAggregate(snake.snakeId, currentSnake)
    const snakeReaded = await this.snakeHead.readSnakeBody(snake.snakeId)
    for (const snakeBodyItem of snakeReaded) {
      snakeAggregate.addSnakeBody(snakeBodyItem)
    }

    const snakeBodyArray = await this.moveBodySnake(snakeAggregate)
    return await snakeAggregate
  }

  async moveHeadSnake (direction: EDirection, snake: SnakeEntity, limit: number) {
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
        return await this.snakeHead.updateSnakeBody(snake.snakeId, newPosition)
      } else {
        const newPosition = snake.snakeBody[index - 1]
        return await this.snakeHead.updateSnakeBody(snake.snakeId, newPosition)
      }
    })
  }

  async growSnake (snakeHeadId:number) {
    const currentSnake = await this.readSnake(snakeHeadId)
    const snake = new SnakeAggregate(snakeHeadId, currentSnake)
    const snakeBodyArray = await this.snakeHead.readSnakeBody(snakeHeadId)
    for (const snakeBodyItem of snakeBodyArray) {
      snake.addSnakeBody(snakeBodyItem)
    }
    const snakeBody = new SnakeBodyEntity(snake.snakeBody.length, currentSnake.snakeHeadPosition)
    await this.snakeHead.growSnake(snake.snakeId, snakeBody)
    snake.addSnakeBody(snakeBody)

    return snake
  }
}
