import { IFood } from '../interfaces/IFood'
import { IPosition } from '../interfaces/IPosition'

export class FoodEntity implements IFood {
  foodId: number
  foodPosition: IPosition

  constructor (foodId: number, foodPosition: IPosition) {
    this.foodId = foodId
    this.foodPosition = foodPosition
  }
}
