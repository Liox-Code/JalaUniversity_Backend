import { Container } from 'inversify'
import { TYPES } from '../../src/type.core'
import 'reflect-metadata'
import { MatchGameService } from '../../src/core/domain/services/matchGame.service'
import { MatchGameTypeOrmRepositoryMock } from './__mocks__/matchGameRepositoryMock'
import { IBoardRepository } from '../../src/core/domain/repositories/IBoard.repository'
import { IFoodRepository } from '../../src/core/domain/repositories/IFood.repository'
import { RandomGeneratorService } from '../../src/core/domain/services/randomGeneratorService'
import { SnakeService } from '../../src/core/domain/services/snake.service'
import { BoardTypeOrmRepositoryMock } from '../board/__mocks__/boardRepositoryMock'
import { FoodTypeOrmRepositoryMock } from '../food/__mocks__/foodRepositoryMock'
import { ScoreService } from '../../src/core/domain/services/score.service'
import { IMatchGameRepository } from '../../src/core/domain/repositories/IMatchGame.repository'
import { SnakeHeadTypeOrmRepositoryMock } from '../snake/__mocks__/snakeHeadRepositoryMock'
import { ISnakeHeadRepository } from '../../src/core/domain/repositories/ISnakeHead.repository'
import { SnakeBodyTypeOrmRepositoryMock } from '../snake/__mocks__/snakeBodyRepositoryMock'
import { ISnakeBodyRepository } from '../../src/core/domain/repositories/ISnakeBody.repository'
import { UserService } from '../../src/core/domain/services/user.service'
import { IUserRepository } from '../../src/core/domain/repositories/IUser.repository'
import { UserTypeOrmRepositoryMock } from '../user/__mocks__/userRepositoryMock'
import { ScoreTypeOrmRepositoryMock } from '../score/__mocks__/scoreRepositoryMock'
import { IScoreRepository } from '../../src/core/domain/repositories/IScore.repository'

let component: MatchGameService
beforeEach(async () => {
  const container = new Container()

  container.bind<ISnakeHeadRepository>(TYPES.SnakeHeadTypeOrmRepository).to(SnakeHeadTypeOrmRepositoryMock)
  container.bind<ISnakeBodyRepository>(TYPES.SnakeBodyTypeOrmRepository).to(SnakeBodyTypeOrmRepositoryMock)
  container.bind<IMatchGameRepository>(TYPES.MatchGameTypeOrmRepository).to(MatchGameTypeOrmRepositoryMock)
  container.bind<IScoreRepository>(TYPES.ScoreTypeOrmRepository).to(ScoreTypeOrmRepositoryMock)
  container.bind<IUserRepository>(TYPES.UserTypeOrmRepository).to(UserTypeOrmRepositoryMock)
  container.bind<IBoardRepository>(TYPES.BoardTypeOrmRepository).to(BoardTypeOrmRepositoryMock)
  container.bind<IFoodRepository>(TYPES.FoodTypeOrmRepository).to(FoodTypeOrmRepositoryMock)
  container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)
  container.bind<SnakeService>(TYPES.SnakeService).to(SnakeService)
  container.bind<UserService>(TYPES.UserService).to(UserService)
  container.bind<ScoreService>(TYPES.ScoreService).to(ScoreService)
  container.bind<MatchGameService>(TYPES.MatchGameService).to(MatchGameService)

  component = container.get<MatchGameService>(TYPES.MatchGameService)
})

test('Create a matchGame', async () => {
  const matchGame = await component.createMatchGame(10)
  expect(matchGame.boardEntity).toEqual({
    boardId: 1,
    boardSize: 12
  })
  expect(matchGame.foodEntity.foodId).toEqual(1)
  expect(matchGame.foodEntity.foodPosition.x).toBeGreaterThanOrEqual(0)
  expect(matchGame.foodEntity.foodPosition.y).toBeLessThanOrEqual(12)
})

test('Get Score', async () => {
  const matchGameList = await component.scoreRanking(10)
  matchGameList.forEach((matchGame) => {
    expect(matchGame).toEqual({
      scoreId: matchGame.scoreId,
      matchGameId: matchGame.matchGameId,
      snakeId: matchGame.snakeId,
      userId: matchGame.userId,
      score: matchGame.score
    })
  })
})
