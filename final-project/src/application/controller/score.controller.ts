import { Request, Response } from 'express'
import { controller, httpGet, BaseHttpController } from 'inversify-express-utils'
import { TYPES } from '../../type.core'
import { inject } from 'inversify'
import { ScoreEntity } from '../../core/domain/entities/score.entity'
import { ScoreService } from '../../core/domain/services/score.service'

@controller('/scores')
class ScoreController extends BaseHttpController {
  constructor (
    @inject(TYPES.ScoreService) private scoreService: ScoreService
  ) {
    super()
  }

  @httpGet('/test')
  public async test (req: Request, res: Response) {
    const scoreEntity: ScoreEntity = {
      scoreId: 1,
      matchGameId: 1,
      userId: 1,
      snakeId: 1,
      score: 100
    }
    const score: ScoreEntity = await this.scoreService.createScore(scoreEntity)
    res.status(200).json({ msg: score })
  }
}

export default ScoreController
