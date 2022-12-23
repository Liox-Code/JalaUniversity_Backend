import { injectable } from 'inversify'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import { FoodEntity } from '../core/domain/entities/food.entity'
import { FoodMapper } from '../database/foodMapper'
import FoodDataEntity from '../database/foodDataEntity'
import { IFoodRepository } from '../core/domain/repositories/IFood.repository'
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
    const foundFood = await this.repository.findOneBy({ foodId: id })
    if (!foundFood) {
      throw new Error(`Food with id ${id} not found`)
    }
    return await FoodMapper.toEntity(foundFood)
  }

  async updateFood (food: FoodEntity): Promise<FoodEntity> {
    const data = await this.repository.save(FoodMapper.toDataEntity(food))
    return await FoodMapper.toEntity(data)
  }

  async eraseFood (foodId: number): Promise<void> {
    const options: FindManyOptions<FoodDataEntity> = {
      where: { foodId }
    }
    const foodDataBodyArray = await this.repository.find(options)
    await this.repository.remove(foodDataBodyArray)
  }
}
