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
  public async create (@queryParam('matchGameId') matchGameId: number, @queryParam('refreshTimeRare') refreshTimeRare: number, req: Request, res: Response) {
    const matchGame = await this.matchGameService.startMatchGame(matchGameId)
    res.status(200).json({ MatchGameData: matchGame })
  }

  @httpGet('/restart')
  public async restart (@queryParam('matchGameId') matchGameId: number, req: Request, res: Response) {
    const matchGameRestarted = await this.matchGameService.restart(matchGameId)
    res.status(200).json({ matchGameRestarted })
  }

  @httpGet('/matchCurrentFrame')
  public async matchCurrentFrame (@queryParam('matchGameId') matchGameId: number, @queryParam('status') status: EMatchGameState, req: Request, res: Response) {
    const matchGameWithNewState = await this.matchGameService.getMatchGameData(matchGameId)
    res.status(200).json({ matchGameWithNewState })
  }

  @httpGet('/matchNextFrame')
  public async matchNextFrame (@queryParam('matchGameId') matchGameId: number, req: Request, res: Response) {
    const matchGameReaded = await this.matchGameService.refreshMatchGame(matchGameId)
    res.status(200).json({ matchGameReaded })
  }

  @httpGet('/changeStatus')
  public async changeStatus (@queryParam('matchGameId') matchGameId:number, @queryParam('status') status: EMatchGameState, req: Request, res: Response) {
    const matchGameWithNewState = await this.matchGameService.changeStatus(matchGameId, status)
    res.status(200).json({ matchGameWithNewState })
  }

  @httpGet('/start')
  public async start (@queryParam('matchGameId') matchGameId:number, @queryParam('intervalTime') intervalTime: number, req: Request, res: Response) {
    const matchGameWithNewState = await this.matchGameService.startTimer(matchGameId, intervalTime)
    res.status(200).json({ matchGameWithNewState })
  }

  @httpGet('/stop')
  public async stop (req: Request, res: Response) {
    const matchGameWithNewState = await this.matchGameService.stopTimer()
    res.status(200).json({ matchGameWithNewState })
  }

  @httpGet('/scoreRanking')
  public async scoreRanking (@queryParam('matchGameId') matchGameId:number, req: Request, res: Response) {
    const matchGameWithNewState = await this.matchGameService.scoreRanking(matchGameId)
    res.status(200).json({ matchGameWithNewState })
  }
}

export default MatchGameController
