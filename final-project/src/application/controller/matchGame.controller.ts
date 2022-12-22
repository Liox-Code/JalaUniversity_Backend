import { Request, Response } from 'express'
import { controller, httpGet, BaseHttpController, queryParam } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { inject } from 'inversify'
import { MatchGameService } from '../../core/domain/services/matchGame.service'
import { EMatchGameState } from '../../core/domain/entities/matchGame.entity'

@controller('/matchGame')
class MatchGameController extends BaseHttpController {
  constructor (
    @inject(TYPES.MatchGameService) private matchGameService: MatchGameService
  ) {
    super()
  }

  @httpGet('/create')
  public async create (@queryParam('size') size: number, @queryParam('refreshTimeRare') refreshTimeRare: number, req: Request, res: Response) {
    const matchGame = await this.matchGameService.startMatchGame(size, refreshTimeRare)
    res.status(200).json({ MatchGameData: matchGame })
  }

  @httpGet('/read')
  public async read (@queryParam('matchId') matchId: number, req: Request, res: Response) {
    const matchGameReaded = await this.matchGameService.refreshMatchGame(matchId)
    res.status(200).json({ matchGameReaded })
  }

  @httpGet('/restart')
  public async restart (@queryParam('matchId') matchId: number, req: Request, res: Response) {
    const matchGameRestarted = await this.matchGameService.restart(matchId)
    res.status(200).json({ matchGameRestarted })
  }

  @httpGet('/changeStatus')
  public async changeStatus (@queryParam('matchId') matchId:number, @queryParam('status') status: EMatchGameState, req: Request, res: Response) {
    const matchGameWithNewState = await this.matchGameService.changeStatus(matchId, status)
    res.status(200).json({ matchGameWithNewState })
  }

  @httpGet('/matchCurrentFrame')
  public async matchCurrentFrame (@queryParam('matchId') matchId:number, @queryParam('status') status: EMatchGameState, req: Request, res: Response) {
    const matchGameWithNewState = await this.matchGameService.getMatchGameData(matchId)
    res.status(200).json({ matchGameWithNewState })
  }
}

export default MatchGameController
