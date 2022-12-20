import { inject, injectable } from 'inversify'
import { EMatchGameState, MatchGameEntity } from '../entities/matchGame.entity'
import { IMatchGameRepository } from '../repositories/IMatchGame.repository'
import { TYPES } from '../../../type.core'
import { ISnakeRepository } from '../repositories/ISnakeHead.repository'
import { IBoardRepository } from '../repositories/IBoard.repository'
import { IFoodRepository } from '../repositories/IFood.repository'
import { SnakeEntity } from '../entities/snake.entity'
import { FoodEntity } from '../entities/food.entity'
import { RandomGeneratorService } from './RandomGeneratorService'
import { SnakeService } from './snake.service'

@injectable()
export class MatchGameService {
  private _matchGame: IMatchGameRepository
  private _snake: ISnakeRepository
  private _board: IBoardRepository
  private _food: IFoodRepository
  private _snakeService: SnakeService
  private _randomGenerator: RandomGeneratorService
  constructor (
    @inject(TYPES.MatchGameTypeOrmRepository) matchGame: IMatchGameRepository,
    @inject(TYPES.SnakeHeadTypeOrmRepository) snake: ISnakeRepository,
    @inject(TYPES.BoardTypeOrmRepository) board: IBoardRepository,
    @inject(TYPES.FoodTypeOrmRepository) food: IFoodRepository,
    @inject(TYPES.RandomGeneratorService) randomGenerator: RandomGeneratorService,
    @inject(TYPES.SnakeService) snakeService: SnakeService
  ) {
    this._matchGame = matchGame
    this._snake = snake
    this._board = board
    this._food = food
    this._randomGenerator = randomGenerator
    this._snakeService = snakeService
  }

  async createMatchGame (size: number): Promise<MatchGameEntity> {
    const seed = 1
    const board = await this._board.createBoard({ boardId: 1, boardSize: size })
    const randonPosition = this._randomGenerator.generateRandomPosition(seed, board.boardSize)
    const snake = await this._snake.createSnake(new SnakeEntity(1, randonPosition, 1))
    const food = await this._food.createFood(new FoodEntity(1, randonPosition))
    const matchGameCreated = await this._matchGame.createMatchGame(new MatchGameEntity(1, board.boardId, snake.snakeId, food.foodId))

    return await matchGameCreated
  }

  async readMatchGame (id: number): Promise<any> {
    const matchGameReaded = await this._matchGame.readMatchGame(id)
    const foodReaded = await this._food.readFood(matchGameReaded.foodId)
    let snakeReaded = await this._snake.readSnake(matchGameReaded.snakeId)
    const boardReaded = await this._board.readBoard(matchGameReaded.boardId)

    snakeReaded = await this._snakeService.moveSnake(snakeReaded.snakeDirection, snakeReaded, boardReaded.boardSize)
    await this._snake.updateSnake(snakeReaded)
    snakeReaded = await this._snake.readSnake(matchGameReaded.snakeId)

    await this.isSnakeInFood(snakeReaded.snakeId)

    const matchGame = {
      matchGameReaded,
      foodReaded,
      boardReaded,
      snakeReaded
    }
    return await matchGame
  }

  async restart (id: number): Promise<any> {
    const firstSeed = 1
    const secondSeed = 2
    const matchGameReaded = await this._matchGame.readMatchGame(id)
    const foodReaded = await this._food.readFood(matchGameReaded.foodId)
    const snakeReaded = await this._snake.readSnake(matchGameReaded.snakeId)
    const boardReaded = await this._board.readBoard(matchGameReaded.boardId)

    const snakeRandonPosition = this._randomGenerator.generateRandomPosition(firstSeed, boardReaded.boardSize)
    const foodRandonPosition = this._randomGenerator.generateRandomPosition(secondSeed, boardReaded.boardSize)

    snakeReaded.snakeHeadPosition = snakeRandonPosition
    snakeReaded.snakeSize = 1
    foodReaded.foodPosition = foodRandonPosition

    await this._snake.updateSnake(snakeReaded)
    await this._food.createFood(foodReaded)

    const matchGame = {
      matchGameReaded,
      foodReaded,
      boardReaded,
      snakeReaded
    }
    return await matchGame
  }

  async isSnakeInFood (id: number): Promise<void> {
    const foodReaded = await this._food.readFood(id)
    const snakeReaded = await this._snake.readSnake(id)
    if ((snakeReaded.snakeHeadPosition.x === foodReaded.foodPosition.x) && (snakeReaded.snakeHeadPosition.y === foodReaded.foodPosition.y)) {
      await this.eatFood(id)
    }
  }

  async eatFood (id: number): Promise<void> {
    const seed = 1
    const boardReaded = await this._board.readBoard(id)
    const snakeReaded = await this._snake.readSnake(id)
    snakeReaded.snakeSize = snakeReaded.snakeSize + 1
    await this._snake.updateSnake(snakeReaded)

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
