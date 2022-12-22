import { injectable } from 'inversify'
import 'reflect-metadata'
import { FoodEntity } from '../../../src/core/domain/entities/food.entity'
import { IFoodRepository } from '../../../src/core/domain/repositories/IFood.repository'
import { foodPropsMock } from './foodPropsMock'

@injectable()
export class FoodTypeOrmRepositoryMock implements IFoodRepository {
  async createFood (food: FoodEntity): Promise<FoodEntity> {
    return await food
  }

  async readFood (id: number): Promise<FoodEntity> {
    const { foodId, foodPosition } = foodPropsMock
    const food = new FoodEntity(foodId, foodPosition)
    return await food
  }

  async updateFood (food: FoodEntity): Promise<FoodEntity> {
    return await food
  }

  async deleteFood (id: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
