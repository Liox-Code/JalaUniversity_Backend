import { inject, injectable } from 'inversify'
import { setInterval } from 'timers'
import { EMatchGameState, MatchGameEntity } from '../entities/matchGame.entity'
import { IMatchGameRepository } from '../repositories/IMatchGame.repository'
import { TYPES } from '../../../type.core'
import { IBoardRepository } from '../repositories/IBoard.repository'
import { IFoodRepository } from '../repositories/IFood.repository'
import { FoodEntity } from '../entities/food.entity'
import { RandomGeneratorService } from './randomGeneratorService'
import { SnakeService } from './snake.service'
import { BoardEntity } from '../entities/board.entity'
import { ScoreService } from './score.service'
import { ScoreEntity } from '../entities/score.entity'

@injectable()
export class MatchGameService {
  private _matchGame: IMatchGameRepository
  private _board: IBoardRepository
  private _food: IFoodRepository
  private _randomGenerator: RandomGeneratorService
  private _snakeService: SnakeService
  private _scoreService: ScoreService
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

  startTimer (matchGameId: number, timeIntervaslSec: number) {
    const timeSec = timeIntervaslSec * 1000
    this.stopTimer()
    this._timer = setInterval(async () => {
      await this.refreshMatchGame(matchGameId)
      console.log('GAME REFRESHED')
    }, timeSec)
  }

  stopTimer () {
    clearInterval(this._timer)
    console.log('GAME STOPS')
  }

  constructor (
    @inject(TYPES.MatchGameTypeOrmRepository) matchGame: IMatchGameRepository,
    @inject(TYPES.BoardTypeOrmRepository) board: IBoardRepository,
    @inject(TYPES.FoodTypeOrmRepository) food: IFoodRepository,
    @inject(TYPES.RandomGeneratorService) randomGenerator: RandomGeneratorService,
    @inject(TYPES.SnakeService) snakeService: SnakeService,
    @inject(TYPES.ScoreService) scoreService: ScoreService
  ) {
    this._matchGame = matchGame
    this._board = board
    this._food = food
    this._randomGenerator = randomGenerator
    this._snakeService = snakeService
    this._scoreService = scoreService
    this._timer = setTimeout(() => {
      console.log('Initialize Timer')
    }, 1)
  }

  async startMatchGame (matchGameId: number) {
    const matchData = await this.createMatchGame(matchGameId)
    // const matchData = await this._matchGame.getAllMatchGame()

    return await matchData
  }

  initProps (matchGameId: number) {
    const boardId = 1
    const foodId = 1
    const scoreId = [1, 2, 3, 4]
    const snakeId = [1, 2, 3, 4]
    const userId = [1, 2, 3, 4]
    const seed = 1
    const size = 10
    const randonPosition = this._randomGenerator.generateRandomPosition(seed, size)

    const boardProps: BoardEntity = {
      boardId,
      boardSize: size
    }

    const foodProps: FoodEntity = {
      foodId,
      foodPosition: randonPosition
    }

    const matchProps: MatchGameEntity = {
      matchGameId,
      boardId: boardProps.boardId,
      foodId: foodProps.foodId,
      matchGameState: EMatchGameState.Ready
    }

    const scoreProps = {
      limit: 10,
      scoreData: [
        {
          score: {
            scoreId: scoreId[0],
            matchGameId: matchProps.matchGameId,
            snakeId: snakeId[0],
            userId: userId[0],
            score: 0
          },
          name: 'User1'
        },
        {
          score: {
            scoreId: scoreId[1],
            matchGameId: matchProps.matchGameId,
            snakeId: snakeId[1],
            userId: userId[1],
            score: 0
          },
          name: 'User2'
        },
        {
          score: {
            scoreId: scoreId[2],
            matchGameId: matchProps.matchGameId,
            snakeId: snakeId[2],
            userId: userId[2],
            score: 0
          },
          name: 'User3'
        },
        {
          score: {
            scoreId: scoreId[3],
            matchGameId: matchProps.matchGameId,
            snakeId: snakeId[3],
            userId: userId[3],
            score: 0
          },
          name: 'User4'
        }
      ]
    }

    const MatchData = {
      boardEntity: boardProps,
      foodEntity: foodProps,
      matchGameEntity: matchProps,
      scoreEntity: scoreProps
    }
    return MatchData
  }

  async createMatchGame (
    matchGameId: number
  ) {
    const boardId = 1
    const foodId = 1
    const scoreId = [1, 2, 3, 4]
    const snakeId = [1, 2, 3, 4]
    const userId = [1, 2, 3, 4]
    const seed = 1
    const size = 10
    const randonPosition = this._randomGenerator.generateRandomPosition(seed, size)

    const boardProps: BoardEntity = {
      boardId,
      boardSize: size
    }

    const foodProps: FoodEntity = {
      foodId,
      foodPosition: randonPosition
    }

    const boardCreated = await this._board.createBoard({ ...boardProps })
    const foodCreated = await this._food.createFood({ ...foodProps })

    const matchProps: MatchGameEntity = {
      matchGameId,
      boardId: boardCreated.boardId,
      foodId: foodCreated.foodId,
      matchGameState: EMatchGameState.Ready
    }

    const matchGameCreated = await this._matchGame.createMatchGame({ ...matchProps })

    const scoreProps = {
      limit: 10,
      scoreData: [
        {
          score: {
            scoreId: scoreId[0],
            matchGameId: matchGameCreated.matchGameId,
            snakeId: snakeId[0],
            userId: userId[0],
            score: 0
          },
          name: 'User1'
        },
        {
          score: {
            scoreId: scoreId[1],
            matchGameId: matchGameCreated.matchGameId,
            snakeId: snakeId[1],
            userId: userId[1],
            score: 0
          },
          name: 'User2'
        },
        {
          score: {
            scoreId: scoreId[2],
            matchGameId: matchGameCreated.matchGameId,
            snakeId: snakeId[2],
            userId: userId[2],
            score: 0
          },
          name: 'User3'
        },
        {
          score: {
            scoreId: scoreId[3],
            matchGameId: matchGameCreated.matchGameId,
            snakeId: snakeId[3],
            userId: userId[3],
            score: 0
          },
          name: 'User4'
        }
      ]
    }

    const scorePromises = scoreProps.scoreData.map(async (score) => {
      return await this._scoreService.createScore({ score: score.score, name: score.name, limit: boardCreated.boardSize })
    })
    const scoreCreated = await Promise.all(scorePromises)

    const MatchData = {
      boardEntity: boardCreated,
      foodEntity: foodCreated,
      matchGameEntity: matchGameCreated,
      scoreEntity: scoreCreated
    }

    return await MatchData
  }

  async eraseMatchGame (matchGame: MatchGameEntity): Promise<void> {
    const { matchGameId, boardId, foodId } = matchGame
    await this._matchGame.eraseMatchGame(matchGameId)

    await this._board.eraseBoard(boardId)
    await this._food.eraseFood(foodId)
    await this._scoreService.eraseAllScoresInMatchGame(matchGameId)
  }

  async getMatchGameData (matchGameId: number) {
    const matchGameReaded = await this._matchGame.getOneMatchGameByCriteria(matchGameId)
    const foodReaded = await this._food.readFood(matchGameReaded.foodId)
    const scoresReaded = await this._scoreService.getAllScoresFulfillCondition({ matchGameId: matchGameReaded.matchGameId })
    const boardReaded = await this._board.readBoard(matchGameReaded.boardId)

    const data = {
      foodReaded,
      scoresReaded,
      boardReaded,
      matchGameReaded
    }
    return await data
  }

  async refreshMatchGame (matchGameId: number) {
    const matchState = await this._matchGame.getOneMatchGameByCriteria(matchGameId)

    await this.snakeDie(matchState.matchGameId)
    await this.eatFoodSnakes(matchState.matchGameId, matchState)
    await this.moveAllSnakes(matchState.matchGameId, matchState)
    const refreshData = await this.getMatchGameData(matchState.matchGameId)
    return await refreshData
  }

  async moveAllSnakes (matchGameId: number, matchState: MatchGameEntity) {
    const boardReaded = await this._board.readBoard(matchState.boardId)
    const scoresReaded = await this._scoreService.getAllScoresFulfillCondition({ matchGameId })

    const moveAllSnakePromises = scoresReaded.map(async (scoreReaded) => {
      const { snake } = scoreReaded
      await this._snakeService.moveAllSnake(snake.snake.snakeHeadReaded.snakeId, boardReaded.boardSize)
    })
    await Promise.all(moveAllSnakePromises)
  }

  async snakeDie (matchGameId: number) {
    const scoresReaded = await this._scoreService.getAllScoresFulfillCondition({ matchGameId })
    try {
      const isCollidingPromises = scoresReaded.map(async (scoreReaded) => {
        const { snake } = scoreReaded
        const snakeId = snake.snake.snakeHeadReaded.snakeId
        const isColliding = await this._snakeService.isCollidingSnake(scoreReaded.snake.snake.snakeHeadReaded, scoreReaded.snake.snake.snakeBodyReaded)
        if (isColliding) {
          await this._snakeService.eraseSnake(snakeId)
          await this._scoreService.eraseScore(scoreReaded.score.scoreId)
          console.log(`Snake Died ${scoreReaded.score.scoreId}`)
        }
      })
      await Promise.all(isCollidingPromises)
    } catch (error) {
      console.log(error)
    }
  }

  async eatFoodSnakes (matchGameId: number, matchState: MatchGameEntity) {
    const scoresReaded = await this._scoreService.getAllScoresFulfillCondition({ matchGameId })
    const isInFoodPromises = scoresReaded.map(async (scoreReaded) => {
      await this.isSnakeInFood(scoreReaded.score, matchState)
    })
    await Promise.all(isInFoodPromises)
  }

  async restart (matchGameId: number) {
    const matchGame = await this._matchGame.getOneMatchGameByCriteria(matchGameId)
    await this.eraseMatchGame(matchGame)
    const createdMatch = await this.createMatchGame(matchGameId)

    return await this.getMatchGameData(createdMatch.matchGameEntity.matchGameId)
  }

  async isSnakeInFood (scoreEntity: ScoreEntity, matchState: MatchGameEntity): Promise<void> {
    const foodReaded = await this._food.readFood(matchState.foodId)
    const snakeReaded = await this._snakeService.readSnakeHead(scoreEntity.snakeId)
    if ((snakeReaded.snakeHeadPosition.x === foodReaded.foodPosition.x) && (snakeReaded.snakeHeadPosition.y === foodReaded.foodPosition.y)) {
      await this.moveFood(matchState)
      await this._snakeService.growSnake(scoreEntity.snakeId)
      scoreEntity.score = snakeReaded.snakeSize * 100
      await this._scoreService.updateScore(scoreEntity)
    }
  }

  async moveFood (matchState: MatchGameEntity): Promise<void> {
    const seed = 1
    const boardReaded = await this._board.readBoard(matchState.boardId)
    const foodReaded = await this._food.readFood(matchState.foodId)
    foodReaded.foodPosition = await this._randomGenerator.generateRandomPosition(seed, boardReaded.boardSize)
    await this._food.updateFood(foodReaded)
  }

  async changeStatus (id: number, state: EMatchGameState): Promise<MatchGameEntity> {
    const matchGameReaded = await this._matchGame.getOneMatchGameByCriteria(id)
    matchGameReaded.matchGameState = state
    return await this._matchGame.updateMatchGame(matchGameReaded)
  }

  async scoreRanking (matchGameId: number) {
    return await this._scoreService.getScoreRanking(matchGameId)
  }
}
