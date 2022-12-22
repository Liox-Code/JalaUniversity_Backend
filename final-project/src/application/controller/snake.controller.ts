import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../core/domain/services/snake.service'
import { inject } from 'inversify'
import { EDirection } from '../../enums/EDirection'
import { SnakeEntity } from '../../core/domain/entities/snake.entity'
import { BoardService } from '../../core/domain/services/board.service'
import { RandomGeneratorService } from '../../core/domain/services/randomGeneratorService'

@controller('/snake')
class SnakeController extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeService) private snakeService: SnakeService,
    @inject(TYPES.BoardService) private boardService: BoardService,
    @inject(TYPES.RandomGeneratorService) private randomGeneratorService: RandomGeneratorService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (@queryParam('snakeId') snakeId: number, req: Request, res: Response, next: NextFunction) {
    const snake: SnakeEntity = await this.snakeService.createSnakeHead(snakeId)
    res.status(200).json({ msg: snake })
  }

  @httpGet('/move')
  public async move (@queryParam('snakeId') snakeId: number, @queryParam('direction') direction: EDirection, req: Request, res: Response, next: NextFunction) {
    const snakeNewPosition = await this.snakeService.changeDirectionSnakeHead(snakeId, direction)
    res.status(200).json({ msg: snakeNewPosition })
  }

  @httpGet('/grow')
  public async grow (@queryParam('snakeId') snakeId: number, req: Request, res: Response, next: NextFunction) {
    const snake = await this.snakeService.createNodeSnake(snakeId)
    res.status(200).json({ msg: snake })
  }

  @httpGet('/test')
  public async test (@queryParam('snakeId') snakeId: number, req: Request, res: Response, next: NextFunction) {
    const snake = await this.snakeService.readNodeSnake(snakeId)
    res.status(200).json({ msg: snake })
  }
}

export default SnakeController
