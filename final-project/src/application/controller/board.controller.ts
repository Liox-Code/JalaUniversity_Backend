import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { BoardService } from '../../core/domain/services/board.service'
import { inject } from 'inversify'
import { AppDataSource } from '../../database/dataSource'
@controller('/board')
class BoardHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.BoardService) private boardService: BoardService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (@queryParam('size') size: number, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const boardCreated = await this.boardService.createBoard({ boardId: 1, boardSize: size })
    await AppDataSource.destroy()
    res.status(200).json({ msg: boardCreated })
  }

  @httpGet('/read')
  public async read (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const boardData = await this.boardService.readBoard(1)
    await AppDataSource.destroy()
    res.status(200).json({ msg: boardData })
  }

  @httpGet('/update')
  public async resize (@queryParam('size') size: number, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const boardLoaded = await this.boardService.readBoard(1)
    boardLoaded.boardSize = size
    const boardUpdated = await this.boardService.updateBoard(boardLoaded)
    await AppDataSource.destroy()
    res.status(200).json({ msg: boardUpdated })
  }
}

export default BoardHandler
