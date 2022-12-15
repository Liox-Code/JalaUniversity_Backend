import { Request, Response, NextFunction } from 'express'
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { inject } from 'inversify'
import { AppDataSource } from '../../database/dataSource'
import { MatchGameService } from '../../services/matchGame.service'

@controller('/matchGame')
class MatchGameHandler extends BaseHttpController {
  constructor (
    @inject(TYPES.MatchGameService) private matchGameService: MatchGameService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const MatchGameCreated = await this.matchGameService.createMatchGame({ matchGameId: 1, boardId: 1, snakeId: 1 })
    await AppDataSource.destroy()
    res.status(200).json({ msg: MatchGameCreated })
  }

  @httpGet('/read')
  public async read (req: Request, res: Response, next: NextFunction) {
    await AppDataSource.initialize()
    const MatchGameReaded = await this.matchGameService.readMatchGame(1)
    await AppDataSource.destroy()
    res.status(200).json({ msg: MatchGameReaded })
  }
}

export default MatchGameHandler
