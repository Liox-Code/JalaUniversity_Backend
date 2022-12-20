import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../core/domain/services/snake.service'
import { inject } from 'inversify'
import { EDirection } from '../../enums/EDirection'
import { SnakeEntity } from '../../core/domain/entities/snake.entity'
import { BoardService } from '../../core/domain/services/board.service'
import { AppDataSource } from '../../database/dataSource'
import { RandomGeneratorService } from '../../core/domain/services/RandomGeneratorService'
@controller('/snake')
class IndexHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeHeadService) private snakeService: SnakeService,
    @inject(TYPES.BoardService) private boardService: BoardService,
    @inject(TYPES.RandomGeneratorService) private randomGeneratorService: RandomGeneratorService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const seed = 1
    const limit = await (await this.boardService.readBoard(1)).boardSize
    const randonPosition = this.randomGeneratorService.generateRandomPosition(seed, limit)

    const snake: SnakeEntity = await this.snakeService.createSnake(new SnakeEntity(1, randonPosition, 1))
    await AppDataSource.destroy()
    res.status(200).json({ msg: snake })
  }

  @httpGet('/move')
  public async move (@queryParam('direction') direction: EDirection, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const snake: SnakeEntity = await this.snakeService.readSnake(1)
    snake.snakeDirection = direction
    const snakeNewPosition = await this.snakeService.updateSnake(snake)
    await AppDataSource.destroy()
    res.status(200).json({ msg: snakeNewPosition })
  }
}

export default IndexHandler
