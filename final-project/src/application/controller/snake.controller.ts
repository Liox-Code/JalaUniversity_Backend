import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../services/snake.service'
import { inject } from 'inversify'
import { EDirection } from '../../enums/EDirection'
import { SnakeEntity } from '../../entities/snake.entity'
@controller('/snake')
class IndexHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeService) private snakeService: SnakeService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (req: Request, res: Response, next: NextFunction) {
    await this.snakeService.initilizeDb()
    const snake: SnakeEntity = await this.snakeService.createSnake(new SnakeEntity(12, { x: 2, y: 2 }, 12))
    res.status(200).json({ msg: snake })
  }

  @httpGet('/move')
  public async index (@queryParam('direction') direction: EDirection, req: Request, res: Response, next: NextFunction) {
    let snake: SnakeEntity = await this.snakeService.readSnake(12)
    snake = await this.snakeService.moveSnake(direction, snake)
    const snakeNewPosition = await this.snakeService.updateSnake(snake)
    res.status(200).json({ msg: snakeNewPosition })
  }
}

export default IndexHandler
