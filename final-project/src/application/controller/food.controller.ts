import { Request, Response } from 'express'
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { inject } from 'inversify'
import { FoodService } from '../../core/domain/services/food.service'

@controller('/food')
class FoodController extends BaseHttpController {
  constructor (
    @inject(TYPES.FoodService) private foodService: FoodService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (req: Request, res: Response) {
    const foodCreated = await this.foodService.createFood({ foodId: 1, foodPosition: { x: 0, y: 0 } })
    res.status(200).json({ foodCreated })
  }

  @httpGet('/read')
  public async read (req: Request, res: Response) {
    const limit = await this.foodService.readFood(1)
    res.status(200).json({ limit })
  }
}

export default FoodController
