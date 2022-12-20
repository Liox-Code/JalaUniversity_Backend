import { injectable } from 'inversify'
import { BoardEntity } from '../entities/board.entity'
import { FoodEntity } from '../entities/food.entity'
import { SnakeAggregate } from './snake.aggregate'

@injectable()
export class MatchGameAggregate {
  private _matchGameId: number
  private _gameState: string
  private _snake: SnakeAggregate
  private _board: BoardEntity
  private _food: FoodEntity

  get matchGameID (): number {
    return this._matchGameId
  }
}
