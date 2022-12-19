import { inject, injectable } from 'inversify'
import { MatchGameEntity } from '../entities/matchGame.entity'
import { IMatchGameRepository } from '../repositories/IMatchGame.repository'
import { TYPES } from '../../../type.core'
import { ISnakeRepository } from '../repositories/ISnakeHead.repository'
import { IBoardRepository } from '../repositories/IBoard.repository'
import { IFoodRepository } from '../repositories/IFood.repository'
import { SnakeEntity } from '../entities/snake.entity'
import { FoodEntity } from '../entities/food.entity'

@injectable()
export class MatchGameService {
  private _matchGame: IMatchGameRepository
  private _snake: ISnakeRepository
  private _board: IBoardRepository
  private _food: IFoodRepository
  constructor (
    @inject(TYPES.MatchGameTypeOrmRepository) matchGame: IMatchGameRepository,
    @inject(TYPES.SnakeHeadTypeOrmRepository) snake: ISnakeRepository,
    @inject(TYPES.BoardTypeOrmRepository) board: IBoardRepository,
    @inject(TYPES.FoodTypeOrmRepository) food: IFoodRepository
  ) {
    this._matchGame = matchGame
    this._snake = snake
    this._board = board
    this._food = food
  }

  async createMatchGame (size: number): Promise<MatchGameEntity> {
    const board = await this._board.createBoard({ boardId: 1, boardSize: size })
    const randonPosition = this._board.randomPosition(board.boardSize)
    const snake = await this._snake.createSnake(new SnakeEntity(1, randonPosition, 1))
    const food = await this._food.createFood(new FoodEntity(1, randonPosition))
    const matchGameCreated = await this._matchGame.createMatchGame({ matchGameId: 1, boardId: board.boardId, snakeId: snake.snakeId, foodId: food.foodId })

    return await matchGameCreated
  }

  async readMatchGame (id: number): Promise<any> {
    const matchGameReaded = await this._matchGame.readMatchGame(id)
    const foodReaded = await this._food.readFood(matchGameReaded.foodId)
    const snakeReaded = await this._snake.readSnake(matchGameReaded.snakeId)
    const boardReaded = await this._board.readBoard(matchGameReaded.boardId)
    const matchGame = {
      foodReaded,
      boardReaded,
      snakeReaded
    }
    return await matchGame
  }

  async restart (): Promise<void> {
  }

  async eatFood (id: number): Promise<void> {
    const foodReaded = await this._food.readFood(id)
    const snakeReaded = await this._snake.readSnake(id)
    if (foodReaded.foodPosition === snakeReaded.snakeHeadPosition) {
      snakeReaded.snakeSize += snakeReaded.snakeSize + 1
      await this._snake.updateSnake(snakeReaded)
    }
  }
}
