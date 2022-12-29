import { injectable } from 'inversify'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import { FoodEntity } from '../core/domain/entities/food.entity'
import { FoodMapper } from '../database/foodMapper'
import FoodDataEntity from '../database/foodDataEntity'
import { IFoodRepository } from '../core/domain/repositories/IFood.repository'
import 'reflect-metadata'
import { ObjectId } from 'mongodb'

@injectable()
export class FoodTypeOrmRepository implements IFoodRepository {
  private readonly repository: Repository<FoodDataEntity>

  constructor () {
    this.repository = AppDataSource.getMongoRepository(FoodDataEntity)
  }

  async createFood (food: FoodEntity): Promise<FoodEntity> {
    const data = await this.repository.save(FoodMapper.toDataEntity(food))
    return await FoodMapper.toEntity(data)
  }

  async readFood (foodId: number): Promise<FoodEntity> {
    const objectId = new ObjectId(foodId)
    const foundFood = await this.repository.findOneBy({ _id: objectId })
    if (!foundFood) {
      throw new Error(`Food with id ${foodId} not found`)
    }
    return await FoodMapper.toEntity(foundFood)
  }

  async updateFood (food: FoodEntity): Promise<FoodEntity> {
    const objectId = new ObjectId(food.foodId)
    await this.repository.update({ _id: objectId }, FoodMapper.toDataEntity(food))

    const foundFood = await this.repository.findOneBy({ _id: objectId })

    if (!foundFood) {
      throw new Error(`updateFood not found after updated ${objectId} not found`)
    }
    return FoodMapper.toEntity(foundFood)
  }

  async eraseFood (foodId: number): Promise<void> {
    const objectId = new ObjectId(foodId)
    const options: FindManyOptions<FoodDataEntity> = {
      where: { _id: objectId }
    }
    const foodDataBodyArray = await this.repository.find(options)
    await this.repository.remove(foodDataBodyArray)
  }
}
