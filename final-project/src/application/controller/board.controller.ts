import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { BoardService } from '../../services/board.service'
import { inject } from 'inversify'
@controller('/board')
class BoardHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.BoardService) private boardService: BoardService
  ) {
    super()
  }

  @httpGet('/')
  public async index (req: Request, res: Response, next: NextFunction) {
    const board = {
      boardId: 111,
      boardWidth: 111,
      boardHeight: 111
    }
    const boardUpdated = await this.boardService.resize(board)
    res.status(200).json({ msg: boardUpdated })
  }

  @httpGet('/read')
  public async read (req: Request, res: Response, next: NextFunction) {
    const boardData = await this.boardService.read()
    res.status(200).json({ msg: boardData })
  }
}

export default BoardHandler
