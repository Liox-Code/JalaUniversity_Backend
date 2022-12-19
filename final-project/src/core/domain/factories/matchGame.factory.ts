import { Snake } from '../aggregates/snake.aggregate'
import { BoardEntity } from '../entities/board.entity'
import { MatchGameEntity } from '../entities/matchGame.entity'
import { SnakeEntity } from '../entities/snake.entity'

export class EntityFactory {
  public createBoard (boardId: number, boardSize:number): BoardEntity {
    return new BoardEntity(boardId, boardSize)
  }

  public createSnake (boardId: number, snakeHead:SnakeEntity): Snake {
    return new Snake(boardId, snakeHead)
  }

  public createMatchGame (matchGameId: number, boardId: number, snakeId: number, foodId: number): MatchGameEntity {
    return new MatchGameEntity(matchGameId, boardId, snakeId, foodId)
  }
}
