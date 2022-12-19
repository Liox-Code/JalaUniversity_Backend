import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { inject } from 'inversify'
import { AppDataSource } from '../../database/dataSource'
import { MatchGameService } from '../../core/domain/services/matchGame.service'
import { SnakeService } from '../../core/domain/services/snake.service'
import { BoardService } from '../../core/domain/services/board.service'
import { EMatchGameState } from '../../core/domain/entities/matchGame.entity'

@controller('/matchGame')
class MatchGameHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.MatchGameService) private matchGameService: MatchGameService,
    @inject(TYPES.SnakeHeadService) private snakeService: SnakeService,
    @inject(TYPES.BoardService) private boardService: BoardService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (@queryParam('size') size: number, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const matchGame = await this.matchGameService.createMatchGame(size)
    await AppDataSource.destroy()
    res.status(200).json({ msg: matchGame })
  }

  @httpGet('/read')
  public async read (@queryParam('matchId') matchId: number, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const matchGameReaded = await this.matchGameService.readMatchGame(matchId)
    await AppDataSource.destroy()
    res.status(200).json({ matchGameReaded })
  }

  @httpGet('/restart')
  public async restart (@queryParam('matchId') matchId: number, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const matchGameRestarted = await this.matchGameService.restart(matchId)
    await AppDataSource.destroy()
    res.status(200).json({ matchGameRestarted })
  }

  @httpGet('/changeStatus')
  public async changeStatus (@queryParam('matchId') matchId:number, @queryParam('status') status: EMatchGameState, req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const matchGameWithNewState = await this.matchGameService.changeStatus(matchId, status)
    await AppDataSource.destroy()
    res.status(200).json({ matchGameWithNewState })
  }
}

export default MatchGameHandler
