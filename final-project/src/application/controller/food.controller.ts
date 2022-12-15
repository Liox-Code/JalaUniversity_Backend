import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { inject } from 'inversify'
import { AppDataSource } from '../../database/dataSource'
import { FoodService } from '../../services/food.service'

@controller('/food')
class FoodHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.FoodService) private foodService: FoodService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const foodCreated = await this.foodService.createFood({ foodId: 1, foodPosition: { x: 0, y: 0 } })
    await AppDataSource.destroy()
    res.status(200).json({ foodCreated })
  }

  @httpGet('/read')
  public async read (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const limit = await this.foodService.readFood(1)
    await AppDataSource.destroy()
    res.status(200).json({ limit })
  }
}

export default FoodHandler
