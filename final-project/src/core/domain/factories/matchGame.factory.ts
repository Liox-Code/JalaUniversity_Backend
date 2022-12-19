import { Snake } from '../aggregates/snake.aggregate'
import { BoardEntity } from '../entities/board.entity'
import { MatchGameEntity } from '../entities/matchGame.entity'
import { SnakeHeadEntity } from '../entities/snakeHead.entity'

export class EntityFactory {
  public createBoard (boardId: number, boardSize:number): BoardEntity {
    return new BoardEntity(boardId, boardSize)
  }

  public createSnake (boardId: number, snakeHead:SnakeHeadEntity): Snake {
    return new Snake(boardId, snakeHead)
  }

  public createMatchGame (matchGameId: number, board: BoardEntity, snake: Snake): MatchGameEntity {
    return new MatchGameEntity(matchGameId, board, snake)
  }
}
