import { Container } from 'inversify'
import { TYPES } from '../../src/type.core'
import 'reflect-metadata'
import { FoodService } from '../../src/core/domain/services/food.service'
import { FoodTypeOrmRepositoryMock } from './__mocks__/foodRepositoryMock'
import { FoodEntity } from '../../src/core/domain/entities/food.entity'

let component:FoodService
beforeEach(async () => {
  const container = new Container()
  container.bind<FoodTypeOrmRepositoryMock>(TYPES.FoodTypeOrmRepository).to(FoodTypeOrmRepositoryMock)
  container.bind<FoodService>(TYPES.FoodService).to(FoodService)
  component = container.get<FoodService>(TYPES.FoodService)
})

test('Create a food', async () => {
  const food = await component.createFood(new FoodEntity(1, { x: 2, y: 1 }))
  expect(food).toEqual({
    foodId: 1,
    foodPosition: { x: 2, y: 1 }
  })
})
