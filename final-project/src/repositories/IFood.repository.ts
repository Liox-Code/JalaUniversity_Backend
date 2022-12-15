import { FoodEntity } from '../entities/food.entity'

export interface IFoodRepository {
  createFood(food: FoodEntity): Promise<FoodEntity>
  readFood(id: number): Promise<FoodEntity>
  updateFood(food: FoodEntity): Promise<FoodEntity>
  deleteFood(id: number): Promise<boolean>
}
