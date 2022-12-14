import { inject, injectable } from 'inversify'
import { FoodEntity } from '../entities/food.entity'
import { IFoodRepository } from '../repositories/IFood.repository'
import { TYPES } from '../../../type.core'

@injectable()
export class FoodService {
  private food: IFoodRepository
  constructor (@inject(TYPES.FoodTypeOrmRepository) food: IFoodRepository) {
    this.food = food
  }

  async createFood (food: FoodEntity): Promise<FoodEntity> {
    return await this.food.createFood(food)
  }

  async readFood (id: number): Promise<FoodEntity> {
    return await this.food.readFood(id)
  }

  async updateFood (food: FoodEntity): Promise<FoodEntity> {
    return await this.food.updateFood(food)
  }

  async deleteFood (id: number): Promise<void> {
    await this.food.eraseFood(id)
  }
}
