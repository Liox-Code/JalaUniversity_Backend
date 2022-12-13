import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, requestParam } from 'inversify-express-utils'
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

  @httpGet('/read')
  public async read (req: Request, res: Response, next: NextFunction) {
    const boardData = await this.boardService.read()
    res.status(200).json({ msg: boardData })
  }

  @httpGet('/size:size')
  public async resize (@requestParam('size') size: number, req: Request, res: Response, next: NextFunction) {
    const boardUpdated = await this.boardService.resize(size)
    res.status(200).json({ msg: boardUpdated })
  }
}

export default BoardHandler
