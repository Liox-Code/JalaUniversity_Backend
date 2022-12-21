import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../core/domain/services/snake.service'
import { inject } from 'inversify'
import { EDirection } from '../../enums/EDirection'
import { SnakeHeadEntity } from '../../core/domain/entities/snakeHead.valueObject'
import { BoardService } from '../../core/domain/services/board.service'
import { AppDataSource } from '../../database/dataSource'
import { RandomGeneratorService } from '../../core/domain/services/RandomGeneratorService'
import { SnakeBodyEntity } from '../../core/domain/entities/snakeBody.valueObject'
import { SnakeAggregate } from '../../core/domain/aggregates/snake.aggregate'
@controller('/snake')
class snakeController extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeService) private snakeService: SnakeService,
    @inject(TYPES.BoardService) private boardService: BoardService,
    @inject(TYPES.RandomGeneratorService) private randomGeneratorService: RandomGeneratorService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (@queryParam('snakeId') snakeId: number, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const snake: SnakeHeadEntity = await this.snakeService.createSnake(snakeId, 1)
    await AppDataSource.destroy()
    res.status(200).json({ msg: snake })
  }

  @httpGet('/move')
  public async move (@queryParam('direction') direction: EDirection, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const snake: SnakeHeadEntity = await this.snakeService.moveSnakeHead(1)
    snake.snakeDirection = direction
    const snakeNewPosition = await this.snakeService.updateSnake(snake)
    await AppDataSource.destroy()
    res.status(200).json({ msg: snakeNewPosition })
  }

  @httpGet('/grow')
  public async grow (@queryParam('snakeId') snakeId: number, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const snake = await this.snakeService.growSnake(snakeId)
    await AppDataSource.destroy()
    res.status(200).json({ msg: snake })
  }
}

export default snakeController
