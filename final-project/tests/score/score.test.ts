import { Container } from 'inversify'
import { TYPES } from '../../src/type.core'
import 'reflect-metadata'
import { ScoreService } from '../../src/core/domain/services/score.service'
import { ScoreTypeOrmRepositoryMock } from './__mocks__/scoreRepositoryMock'
import { SnakeService } from '../../src/core/domain/services/snake.service'
import { SnakeHeadTypeOrmRepositoryMock } from '../snake/__mocks__/snakeHeadRepositoryMock'
import { SnakeBodyTypeOrmRepositoryMock } from '../snake/__mocks__/snakeBodyRepositoryMock'
import { RandomGeneratorService } from '../../src/core/domain/services/randomGeneratorService'
import { UserService } from '../../src/core/domain/services/user.service'
import { UserTypeOrmRepositoryMock } from '../user/__mocks__/userRepositoryMock'

let component: ScoreService
beforeEach(async () => {
  const container = new Container()
  container.bind<SnakeHeadTypeOrmRepositoryMock>(TYPES.SnakeHeadTypeOrmRepository).to(SnakeHeadTypeOrmRepositoryMock)
  container.bind<SnakeBodyTypeOrmRepositoryMock>(TYPES.SnakeBodyTypeOrmRepository).to(SnakeBodyTypeOrmRepositoryMock)
  container.bind<UserTypeOrmRepositoryMock>(TYPES.UserTypeOrmRepository).to(UserTypeOrmRepositoryMock)
  container.bind<ScoreTypeOrmRepositoryMock>(TYPES.ScoreTypeOrmRepository).to(ScoreTypeOrmRepositoryMock)
  container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)
  container.bind<SnakeService>(TYPES.SnakeService).to(SnakeService)
  container.bind<UserService>(TYPES.UserService).to(UserService)
  container.bind<ScoreService>(TYPES.ScoreService).to(ScoreService)
  component = container.get<ScoreService>(TYPES.ScoreService)
})

test('Create a user', async () => {
  console.log()
})
