import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../services/snake.service'
import { inject } from 'inversify'
import { EDirection } from '../../enums/EDirection'
import { SnakeEntity } from '../../entities/snake.entity'
import { BoardService } from '../../services/board.service'
import { AppDataSource } from '../../database/dataSource'
@controller('/snake')
class IndexHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeService) private snakeService: SnakeService,
    @inject(TYPES.BoardService) private boardService: BoardService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const limit = await (await this.boardService.readBoard(1)).boardSize
    const randonPosition = this.boardService.randomPosition(limit)
    const snake: SnakeEntity = await this.snakeService.createSnake(new SnakeEntity(1, randonPosition, 1))
    await AppDataSource.destroy()
    res.status(200).json({ msg: snake })
  }

  @httpGet('/move')
  public async move (@queryParam('direction') direction: EDirection, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    let snake: SnakeEntity = await this.snakeService.readSnake(1)
    snake = await this.snakeService.moveSnake(direction, snake, 10)
    const snakeNewPosition = await this.snakeService.updateSnake(snake)
    await AppDataSource.destroy()
    res.status(200).json({ msg: snakeNewPosition })
  }
}

export default IndexHandler
