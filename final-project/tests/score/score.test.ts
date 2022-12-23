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
import { scorePropsMock } from './__mocks__/scorePropsMock'
import { ScoreEntity } from '../../src/core/domain/entities/score.entity'

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

test('Create a Score', async () => {
  const scoreProps = new ScoreEntity(scorePropsMock.scoreId, scorePropsMock.matchGameId, scorePropsMock.snakeId, scorePropsMock.userId, scorePropsMock.score)
  const limit = 10
  const name = 'Liox'
  const score = await component.createScore({ score: scoreProps, limit, name })
  await component.createSnake(score.snakeId, limit)
  await component.createUser({ userId: score.userId, name })

  expect(score).toEqual({
    scoreId: scoreProps.scoreId,
    matchGameId: scoreProps.matchGameId,
    userId: score.userId,
    snakeId: score.snakeId,
    score: score.score
  })
})

test('Get a Score', async () => {
  const scoreProps = new ScoreEntity(scorePropsMock.scoreId, scorePropsMock.matchGameId, scorePropsMock.snakeId, scorePropsMock.userId, scorePropsMock.score)
  const score = await component.getOneScoreFulfillCondition({ matchGameId: scoreProps.matchGameId })
  expect(score).toEqual({
    scoreId: scoreProps.scoreId,
    matchGameId: scoreProps.matchGameId,
    userId: score.userId,
    snakeId: score.snakeId,
    score: score.score
  })
})

test('Get a Score', async () => {
  const scoreProps = new ScoreEntity(scorePropsMock.scoreId, scorePropsMock.matchGameId, scorePropsMock.snakeId, scorePropsMock.userId, scorePropsMock.score)
  const score = await component.updateScore(scoreProps)
  expect(score).toEqual({
    scoreId: scoreProps.scoreId,
    matchGameId: scoreProps.matchGameId,
    userId: scoreProps.userId,
    snakeId: scoreProps.snakeId,
    score: scoreProps.score
  })
})

// test('Get all Scoresrase a Score', async () => {
//   const scoreProps = new ScoreEntity(scorePropsMock.scoreId, scorePropsMock.matchGameId, scorePropsMock.snakeId, scorePropsMock.userId, scorePropsMock.score)
//   const scoreList = await component.getAllScoresFulfillCondition({ scoreId: scoreProps.scoreId })

//   scoreList.forEach((scoreItem) => {
//     expect(scoreItem).toEqual({
//       scoreId: scoreProps.scoreId,
//       matchGameId: scoreProps.matchGameId,
//       userId: scoreProps.userId,
//       snakeId: scoreProps.snakeId,
//       scoreProps: scoreProps.score
//     })
//   })
// })
