import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { BoardService } from '../../core/domain/services/board.service'
import { inject } from 'inversify'
@controller('/board')
class BoardController extends BaseHttpController {
  constructor (
    @inject(TYPES.BoardService) private boardService: BoardService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (@queryParam('size') size: number, req: Request, res: Response, next: NextFunction) {
    const boardCreated = await this.boardService.createBoard({ boardId: 1, boardSize: size })
    res.status(200).json({ msg: boardCreated })
  }

  @httpGet('/read')
  public async read (req: Request, res: Response, next: NextFunction) {
    const boardData = await this.boardService.readBoard(1)
    res.status(200).json({ msg: boardData })
  }

  @httpGet('/update')
  public async resize (@queryParam('size') size: number, req: Request, res: Response, next: NextFunction) {
    const boardLoaded = await this.boardService.readBoard(1)
    boardLoaded.boardSize = size
    const boardUpdated = await this.boardService.updateBoard(boardLoaded)
    res.status(200).json({ msg: boardUpdated })
  }
}

export default BoardController
