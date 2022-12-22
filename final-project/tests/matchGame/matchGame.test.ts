import { Container } from 'inversify'
import { TYPES } from '../../src/type.core'
import 'reflect-metadata'
import { MatchGameService } from '../../src/core/domain/services/matchGame.service'
import { MatchGameTypeOrmRepositoryMock } from './__mocks__/matchGameRepositoryMock'
import { MatchGameEntity, EMatchGameState } from '../../src/core/domain/entities/matchGame.entity'
import { ISnakeHeadRepository } from '../../src/core/domain/repositories/ISnakeHead.repository'
import { ISnakeBodyRepository } from '../../src/core/domain/repositories/ISnakeBody.repository'
import { IBoardRepository } from '../../src/core/domain/repositories/IBoard.repository'
import { IFoodRepository } from '../../src/core/domain/repositories/IFood.repository'
import { RandomGeneratorService } from '../../src/core/domain/services/randomGeneratorService'
import { SnakeService } from '../../src/core/domain/services/snake.service'
import { SnakeHeadTypeOrmRepositoryMock } from '../snake/__mocks__/snakeHeadRepositoryMock'
import { SnakeBodyTypeOrmRepositoryMock } from '../snake/__mocks__/snakeBodyRepositoryMock'
import { BoardTypeOrmRepositoryMock } from '../board/__mocks__/boardRepositoryMock'
import { FoodTypeOrmRepositoryMock } from '../food/__mocks__/foodRepositoryMock'

let component:MatchGameService
beforeEach(async () => {
  const container = new Container()
  container.bind<MatchGameTypeOrmRepositoryMock>(TYPES.MatchGameTypeOrmRepository).to(MatchGameTypeOrmRepositoryMock)
  container.bind<ISnakeHeadRepository>(TYPES.SnakeHeadTypeOrmRepository).to(SnakeHeadTypeOrmRepositoryMock)
  container.bind<ISnakeBodyRepository>(TYPES.SnakeBodyTypeOrmRepository).to(SnakeBodyTypeOrmRepositoryMock)
  container.bind<IBoardRepository>(TYPES.BoardTypeOrmRepository).to(BoardTypeOrmRepositoryMock)
  container.bind<IFoodRepository>(TYPES.FoodTypeOrmRepository).to(FoodTypeOrmRepositoryMock)
  container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)
  container.bind<SnakeService>(TYPES.SnakeService).to(SnakeService)
  container.bind<MatchGameService>(TYPES.MatchGameService).to(MatchGameService)
  component = container.get<MatchGameService>(TYPES.MatchGameService)
})

test('Create a matchGame', async () => {
  const matchGame = await component.createMatchGame(10)
  console.log(matchGame)
})

// test('Create a matchGame', async () => {
//   const matchGame = await component.createMatchGame(10)
//   expect(matchGame).toEqual({
//     boardEntity: {
//       boardId: 1,
//       boardSize: 12
//     },
//     snakeEntity: {
//       snakeId: 1,
//       snakeHeadPosition: { x: 9, y: 6 },
//       snakeSize: 1
//     },
//     foodEntity: {
//       foodId: 1,
//       foodPosition: { x: 9, y: 6 }
//     },
//     matchGameEntity: {
//       matchGameId: 1,
//       boardId: 1,
//       foodId: 1,
//       snakeId: 1,
//       matchGameState: EMatchGameState.Ready
//     }
//   })
// })
