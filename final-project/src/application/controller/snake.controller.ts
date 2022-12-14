import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../services/snake.service'
import { inject } from 'inversify'
import { EDirection } from '../../enums/EDirection'
import { IPosition } from '../../interfaces/IPosition'
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
    const snake: SnakeEntity = new SnakeEntity(12, { x: 2, y: 2 }, 12)
    res.status(200).json({ msg: snake })
  }

  @httpGet('/move')
  public async index (@queryParam('direction') direction: EDirection, req: Request, res: Response, next: NextFunction) {
    let position: IPosition = { x: 2, y: 2 }
    position = await this.snakeService.directionPosition(direction, position)
    const snakeNewPosition = await this.snakeService.updatePosition(position)
    res.status(200).json({ msg: snakeNewPosition })
  }
}

export default IndexHandler
