import { IPosition } from '../interfaces/IPosition'

export class foodEntity {
  foodId: number
  foodHeadPosition: IPosition

  constructor (foodId: number, foodHeadPosition: IPosition) {
    this.foodId = foodId
    this.foodHeadPosition = foodHeadPosition
  }
}
