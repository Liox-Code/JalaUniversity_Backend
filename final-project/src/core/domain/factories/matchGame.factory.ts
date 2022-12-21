import { SnakeAggregate } from '../aggregates/snake.aggregate'
import { BoardEntity } from '../entities/board.entity'
import { MatchGameEntity } from '../entities/matchGame.entity'
import { SnakeHeadEntity } from '../entities/snakeHead.valueObject'

export class EntityFactory {
  public createBoard (boardId: number, boardSize:number): BoardEntity {
    return new BoardEntity(boardId, boardSize)
  }

  public createSnake (boardId: number, snakeHead:SnakeHeadEntity): SnakeAggregate {
    return new SnakeAggregate(boardId, snakeHead)
  }

  public createMatchGame (matchGameId: number, boardId: number, snakeId: number, foodId: number): MatchGameEntity {
    return new MatchGameEntity(matchGameId, boardId, snakeId, foodId)
  }
}
