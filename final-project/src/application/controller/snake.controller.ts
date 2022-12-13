import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../services/snake.service'
import { inject } from 'inversify'
import { EDirection } from '../../enums/EDirection'
import { IPosition } from '../../interfaces/IPosition'
@controller('/snake')
class IndexHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeService) private snakeService: SnakeService
  ) {
    super()
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
