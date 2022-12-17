import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../core/domain/services/snakeHead.service'
import { inject } from 'inversify'
import { EDirection } from '../../enums/EDirection'
import { SnakeHeadEntity } from '../../core/domain/entities/snakeHead.entity'
import { BoardService } from '../../core/domain/services/board.service'
import { AppDataSource } from '../../database/dataSource'
@controller('/snake')
class IndexHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeHeadService) private snakeService: SnakeService,
    @inject(TYPES.BoardService) private boardService: BoardService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const limit = await (await this.boardService.readBoard(1)).boardSize
    const randonPosition = this.boardService.randomPosition(limit)
    const snake: SnakeHeadEntity = await this.snakeService.createSnake(new SnakeHeadEntity(1, randonPosition, 1))
    await AppDataSource.destroy()
    res.status(200).json({ msg: snake })
  }

  @httpGet('/move')
  public async move (@queryParam('direction') direction: EDirection, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    let snake: SnakeHeadEntity = await this.snakeService.readSnake(1)
    const limit = await (await this.boardService.readBoard(1)).boardSize
    snake = await this.snakeService.moveSnake(direction, snake, limit)
    const snakeNewPosition = await this.snakeService.updateSnake(snake)
    await AppDataSource.destroy()
    res.status(200).json({ msg: snakeNewPosition })
  }
}

export default IndexHandler
