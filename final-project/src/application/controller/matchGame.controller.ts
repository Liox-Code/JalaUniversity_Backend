import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { inject } from 'inversify'
import { AppDataSource } from '../../database/dataSource'
import { MatchGameService } from '../../services/matchGame.service'
import { SnakeService } from '../../services/snake.service'
import { BoardService } from '../../services/board.service'

@controller('/matchGame')
class MatchGameHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.MatchGameService) private matchGameService: MatchGameService,
    @inject(TYPES.SnakeService) private snakeService: SnakeService,
    @inject(TYPES.BoardService) private boardService: BoardService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (@queryParam('size') size: number, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const boardCreated = await this.boardService.createBoard({ boardId: 1, boardSize: size })
    const randonPosition = this.boardService.randomPosition(boardCreated.boardSize)
    const snakeCreated = await this.snakeService.createSnake({ snakeId: 1, snakeHeadPosition: randonPosition, snakeSize: 1 })
    const matchGameCreated = await this.matchGameService.createMatchGame({ matchGameId: 1, boardId: boardCreated.boardId, snakeId: snakeCreated.snakeId })
    await AppDataSource.destroy()
    const matchGame = {
      matchGame: matchGameCreated,
      board: boardCreated,
      snake: snakeCreated
    }
    res.status(200).json({ msg: matchGame })
  }

  @httpGet('/read')
  public async read (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const matchGameReaded = await this.matchGameService.readMatchGame(1)
    const boardReaded = await this.boardService.readBoard(1)
    const snakeReaded = await this.snakeService.readSnake(1)
    await AppDataSource.destroy()
    const matchGame = {
      matchGame: matchGameReaded,
      board: boardReaded,
      snake: snakeReaded
    }
    res.status(200).json({ matchGame })
  }
}

export default MatchGameHandler
