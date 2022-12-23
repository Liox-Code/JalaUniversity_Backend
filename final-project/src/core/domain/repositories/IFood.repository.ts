import { FoodEntity } from '../entities/food.entity'

export interface IFoodRepository {
  createFood(food: FoodEntity): Promise<FoodEntity>
  readFood(foodId: number): Promise<FoodEntity>
  updateFood(food: FoodEntity): Promise<FoodEntity>
  eraseFood(foodId: number): Promise<void>
}
