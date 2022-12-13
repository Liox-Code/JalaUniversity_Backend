import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../services/snake.service'
import { inject } from 'inversify'
@controller('/')
class IndexHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeService) private snakeService: SnakeService
  ) {
    super()
  }

  @httpGet('/')
  public index (req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ msg: this.snakeService.grow() })
  }
}

export default IndexHandler
