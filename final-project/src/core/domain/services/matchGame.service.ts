import { inject, injectable } from 'inversify'
import { EMatchGameState, MatchGameEntity } from '../entities/matchGame.entity'
import { IMatchGameRepository } from '../repositories/IMatchGame.repository'
import { TYPES } from '../../../type.core'
import { ISnakeHeadRepository } from '../repositories/ISnakeHead.repository'
import { IBoardRepository } from '../repositories/IBoard.repository'
import { IFoodRepository } from '../repositories/IFood.repository'
import { SnakeEntity } from '../entities/snake.entity'
import { FoodEntity } from '../entities/food.entity'
import { RandomGeneratorService } from './randomGeneratorService'
import { SnakeService } from './snake.service'
import { ISnakeBodyRepository } from '../repositories/ISnakeBody.repository'

@injectable()
export class MatchGameService {
  private _matchGame: IMatchGameRepository
  private _snakeHeadRepo: ISnakeHeadRepository
  private _snakeBodyRepo: ISnakeBodyRepository
  private _board: IBoardRepository
  private _food: IFoodRepository
  private _snakeService: SnakeService
  private _randomGenerator: RandomGeneratorService
  constructor (
    @inject(TYPES.MatchGameTypeOrmRepository) matchGame: IMatchGameRepository,
    @inject(TYPES.SnakeHeadTypeOrmRepository) snakeHeadRepo: ISnakeHeadRepository,
    @inject(TYPES.SnakeBodyTypeOrmRepository) snakeBodyRepo: ISnakeBodyRepository,
    @inject(TYPES.BoardTypeOrmRepository) board: IBoardRepository,
    @inject(TYPES.FoodTypeOrmRepository) food: IFoodRepository,
    @inject(TYPES.RandomGeneratorService) randomGenerator: RandomGeneratorService,
    @inject(TYPES.SnakeService) snakeService: SnakeService
  ) {
    this._matchGame = matchGame
    this._snakeHeadRepo = snakeHeadRepo
    this._snakeBodyRepo = snakeBodyRepo
    this._board = board
    this._food = food
    this._randomGenerator = randomGenerator
    this._snakeService = snakeService
  }

  async createMatchGame (size: number): Promise<MatchGameEntity> {
    const seed = 1
    const board = await this._board.createBoard({ boardId: 1, boardSize: size })
    const randonPosition = this._randomGenerator.generateRandomPosition(seed, board.boardSize)
    const snake = await this._snakeHeadRepo.createSnake(new SnakeEntity(1, randonPosition, 1))
    const food = await this._food.createFood(new FoodEntity(1, randonPosition))
    const matchGameCreated = await this._matchGame.createMatchGame(new MatchGameEntity(1, board.boardId, snake.snakeId, food.foodId))

    return await matchGameCreated
  }

  async refreshMatchGame (id: number): Promise<any> {
    const matchGameReaded = await this._matchGame.readMatchGame(id)
    const snakeHeadReaded = await this._snakeHeadRepo.readSnake(matchGameReaded.snakeId)

    await this._snakeService.moveAllSnake(snakeHeadReaded.snakeId)
    const isColliding = await this._snakeService.isCollidingSnake(snakeHeadReaded.snakeId)
    if (isColliding) {
      await this.restart(snakeHeadReaded.snakeId)
    }
    await this.isSnakeInFood(snakeHeadReaded.snakeId)

    const refreshData = await this.readSnake(id)

    const matchGame = {
      isColliding,
      refreshData
    }
    return await matchGame
  }

  async readSnake (id: number): Promise<any> {
    const matchGameReaded = await this._matchGame.readMatchGame(id)
    const foodReaded = await this._food.readFood(matchGameReaded.foodId)
    const snakeHeadReaded = await this._snakeHeadRepo.readSnake(matchGameReaded.snakeId)
    const snakeBodyReaded = await this._snakeBodyRepo.readSnakeBody(matchGameReaded.snakeId)
    const boardReaded = await this._board.readBoard(matchGameReaded.boardId)

    const matchGame = {
      foodReaded,
      snakeHeadReaded,
      snakeBodyReaded,
      boardReaded,
      matchGameReaded
    }
    return await matchGame
  }

  async restart (id: number): Promise<any> {
    const firstSeed = 1
    const secondSeed = 2
    const matchGameReaded = await this._matchGame.readMatchGame(id)
    const foodReaded = await this._food.readFood(matchGameReaded.foodId)
    const snakeReaded = await this._snakeHeadRepo.readSnake(matchGameReaded.snakeId)
    const snakeNodesReaded = await this._snakeBodyRepo.readSnakeBody(matchGameReaded.snakeId)
    const boardReaded = await this._board.readBoard(matchGameReaded.boardId)

    const snakeRandonPosition = this._randomGenerator.generateRandomPosition(firstSeed, boardReaded.boardSize)
    const foodRandonPosition = this._randomGenerator.generateRandomPosition(secondSeed, boardReaded.boardSize)

    snakeReaded.snakeHeadPosition = snakeRandonPosition
    snakeReaded.snakeSize = 1
    foodReaded.foodPosition = foodRandonPosition
    matchGameReaded.matchGameState = EMatchGameState.Ready

    await this._matchGame.updateMatchGame(matchGameReaded)
    await this._food.updateFood(foodReaded)
    await this._snakeHeadRepo.updateSnake(snakeReaded)
    await this._snakeBodyRepo.dieSnake(snakeReaded.snakeId)

    const matchGame = {
      foodReaded,
      snakeReaded,
      snakeNodesReaded,
      boardReaded,
      matchGameReaded
    }
    return await matchGame
  }

  async isSnakeInFood (id: number): Promise<void> {
    const foodReaded = await this._food.readFood(id)
    const snakeReaded = await this._snakeHeadRepo.readSnake(id)
    if ((snakeReaded.snakeHeadPosition.x === foodReaded.foodPosition.x) && (snakeReaded.snakeHeadPosition.y === foodReaded.foodPosition.y)) {
      await this.moveFood(id)
      await this._snakeService.growSnake(id)
    }
  }

  async moveFood (id: number): Promise<void> {
    const seed = 1
    const boardReaded = await this._board.readBoard(id)
    const foodReaded = await this._food.readFood(id)
    foodReaded.foodPosition = await this._randomGenerator.generateRandomPosition(seed, boardReaded.boardSize)
    await this._food.updateFood(foodReaded)
  }

  async changeStatus (id: number, state: EMatchGameState): Promise<MatchGameEntity> {
    const matchGameReaded = await this._matchGame.readMatchGame(id)
    matchGameReaded.matchGameState = state
    return await this._matchGame.updateMatchGame(matchGameReaded)
  }
}
