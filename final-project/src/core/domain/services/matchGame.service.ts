import { inject, injectable } from 'inversify'
import { setInterval } from 'timers'
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
import { BoardEntity } from '../entities/board.entity'
import { EDirection } from '../../../enums/EDirection'

type TMatchGameProps = {
  boardEntity: BoardEntity
  snakeEntity: SnakeEntity
  foodEntity: FoodEntity
  matchGameEntity: MatchGameEntity
}

@injectable()
export class MatchGameService {
  private _matchGame: IMatchGameRepository
  private _snakeHeadRepo: ISnakeHeadRepository
  private _snakeBodyRepo: ISnakeBodyRepository
  private _board: IBoardRepository
  private _food: IFoodRepository
  private _snakeService: SnakeService
  private _randomGenerator: RandomGeneratorService
  private _timer: ReturnType<typeof setInterval>

  get timer () {
    if (this._timer === null) {
      throw new Error('Timer is null')
    } else {
      return this._timer
    }
  }

  set timer (timer: ReturnType<typeof setInterval>) {
    this._timer = timer
  }

  startTimer (timeIntervaslSec: number) {
    return setInterval(async () => {
      await this.refreshMatchGame(1)
      console.log('GAME REFRESHED')
    }, timeIntervaslSec)
  }

  stopTimer (timer: ReturnType<typeof setInterval>) {
    clearInterval(timer)
    console.log('GAME STOPS')
  }

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
    this._timer = setTimeout(() => {
      console.log('Initialize Timer')
    }, 1)
  }

  async startMatchGame (size: number, refreshTimeRare: number): Promise<any> {
    const matchData = await this.createMatchGame(size)

    const timeIntervaslSec = refreshTimeRare * 1000
    this.stopTimer(this.timer)
    this.timer = this.startTimer(timeIntervaslSec)

    return await matchData
  }

  initProps (size: number): TMatchGameProps {
    const boardId = 1
    const snakeId = 1
    const foodId = 1
    const matchId = 1
    const seed = 1
    const randonPosition = this._randomGenerator.generateRandomPosition(seed, size)

    const boardProps: BoardEntity = {
      boardId,
      boardSize: size
    }

    const snakeProps: SnakeEntity = {
      snakeId,
      snakeHeadPosition: randonPosition,
      snakeDirection: EDirection.UP,
      snakeSize: 1
    }

    const foodProps: FoodEntity = {
      foodId,
      foodPosition: randonPosition
    }

    const matchProps: MatchGameEntity = {
      matchGameId: matchId,
      boardId: boardProps.boardId,
      snakeId: snakeProps.snakeId,
      foodId: foodProps.foodId
    }

    const MatchData = {
      boardEntity: boardProps,
      snakeEntity: snakeProps,
      foodEntity: foodProps,
      matchGameEntity: matchProps
    }
    return MatchData
  }

  async createMatchGame (
    size: number
  ): Promise<TMatchGameProps> {
    const {
      boardEntity,
      snakeEntity,
      foodEntity,
      matchGameEntity
    } = this.initProps(size)

    const board = await this._board.createBoard({ ...boardEntity })
    const snake = await this._snakeHeadRepo.createSnake({ ...snakeEntity })
    const food = await this._food.createFood({ ...foodEntity })
    const matchGameCreated = await this._matchGame.createMatchGame({ ...matchGameEntity })

    const MatchData = {
      boardEntity: board,
      snakeEntity: snake,
      foodEntity: food,
      matchGameEntity: matchGameCreated
    }

    return await MatchData
  }

  async getMatchGameData (id: number): Promise<any> {
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

  async refreshMatchGame (id: number): Promise<any> {
    const matchGameReaded = await this._matchGame.readMatchGame(id)
    const snakeHeadReaded = await this._snakeHeadRepo.readSnake(matchGameReaded.snakeId)

    await this._snakeService.moveAllSnake(snakeHeadReaded.snakeId)

    const isColliding = await this._snakeService.isCollidingSnake(snakeHeadReaded.snakeId)
    if (isColliding) {
      await this.restart(snakeHeadReaded.snakeId)
    }

    await this.isSnakeInFood(snakeHeadReaded.snakeId)

    const refreshData = await this.getMatchGameData(id)

    const matchGame = {
      isColliding,
      refreshData
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

    this.stopTimer(this.timer)
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
