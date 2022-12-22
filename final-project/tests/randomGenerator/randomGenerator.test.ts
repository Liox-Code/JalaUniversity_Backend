import { Container } from 'inversify'
import { TYPES } from '../../src/type.core'
import 'reflect-metadata'
import { RandomGeneratorService } from '../../src/core/domain/services/randomGeneratorService'

let component: RandomGeneratorService
beforeEach(async () => {
  const container = new Container()
  container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)
  component = container.get<RandomGeneratorService>(TYPES.RandomGeneratorService)
})

test('RandomNumber returns a random position between 0 and 10', () => {
  const randomNumber = component.generateRandomPosition(1, 10)
  expect(randomNumber.x).toBeGreaterThanOrEqual(0)
  expect(randomNumber.x).toBeLessThanOrEqual(10)
  expect(randomNumber.y).toBeGreaterThanOrEqual(0)
  expect(randomNumber.y).toBeLessThanOrEqual(10)
})

test('randomNumber returns a different value each time it is called', () => {
  const firstRandomNumber = component.generateRandomPosition(2, 10)
  const secondRandomNumber = component.generateRandomPosition(3, 10)
  expect(firstRandomNumber).not.toEqual(secondRandomNumber)
})
