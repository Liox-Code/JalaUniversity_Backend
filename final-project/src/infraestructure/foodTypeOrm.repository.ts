import { injectable } from 'inversify'
import { Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import { FoodEntity } from '../entities/food.entity'
import { FoodMapper } from '../database/foodMapper'
import FoodDataEntity from '../database/foodDataEntity'
import { IFoodRepository } from '../repositories/IFood.repository'
import 'reflect-metadata'

@injectable()
export class FoodTypeOrmRepository implements IFoodRepository {
  private readonly repository: Repository<FoodDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(FoodDataEntity)
  }

  async createFood (food: FoodEntity): Promise<FoodEntity> {
    const data = await this.repository.save(FoodMapper.toDataEntity(food))
    return await FoodMapper.toEntity(data)
  }

  async readFood (id: number): Promise<FoodEntity> {
    const data = await this.repository.findOneBy({ foodId: id })
    return await FoodMapper.toEntity(data)
  }

  async updateFood (food: FoodEntity): Promise<FoodEntity> {
    const data = await this.repository.save(FoodMapper.toDataEntity(food))
    return await FoodMapper.toEntity(data)
  }

  async deleteFood (id: number): Promise<boolean> {
    return await false
  }
}
