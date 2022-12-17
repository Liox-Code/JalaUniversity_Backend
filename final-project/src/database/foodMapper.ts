import { FoodEntity } from '../core/domain/entities/food.entity'
import FoodDataEntity from './foodDataEntity'

export class FoodMapper {
  static toEntity (food: FoodDataEntity): FoodEntity {
    const foodDataEntity: FoodEntity = {
      foodId: food.foodId,
      foodPosition: { x: food.foodXPosition, y: food.foodYPosition }
    }

    return foodDataEntity
  }

  static toDataEntity (food: FoodEntity): FoodDataEntity {
    const foodDataEntity: FoodDataEntity = {
      foodId: food.foodId,
      foodXPosition: food.foodPosition.x,
      foodYPosition: food.foodPosition.y
    }

    return foodDataEntity
  }
}
