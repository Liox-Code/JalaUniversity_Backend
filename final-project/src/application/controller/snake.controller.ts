import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, requestParam, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { SnakeService } from '../../services/snake.service'
import { inject } from 'inversify'
@controller('/snake')
class IndexHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.SnakeService) private snakeService: SnakeService
  ) {
    super()
  }

  @httpGet('/move')
  public async index (@queryParam('direction') direction: string, req: Request, res: Response, next: NextFunction) {
    const snakeNewPosition = await this.snakeService.nextPosition({ x: 5, y: 2 })
    console.log(this.snakeService)
    console.log(snakeNewPosition)
    res.status(200).json({ msg: direction })
  }
}

export default IndexHandler
