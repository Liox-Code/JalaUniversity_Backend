import { inject, injectable } from 'inversify'
import { TYPES } from '../../../type.core'
import { ScoreEntity } from '../entities/score.entity'
import { UserEntity } from '../entities/user.entity'
import { IScoreRepository, TScoreCriteria } from '../repositories/IScore.repository'
import { TUserCriteria } from '../repositories/IUser.repository'
import { SnakeService } from './snake.service'
import { UserService } from './user.service'

@injectable()
export class ScoreService {
  private readonly _scoreRepo: IScoreRepository
  private readonly _snakeService: SnakeService
  private readonly _userService: UserService
  constructor (
    @inject(TYPES.SnakeService) snakeService: SnakeService,
    @inject(TYPES.UserService) userService: UserService,
    @inject(TYPES.ScoreTypeOrmRepository) scoreRepo: IScoreRepository
  ) {
    this._scoreRepo = scoreRepo
    this._snakeService = snakeService
    this._userService = userService
  }

  async createScore ({ score, limit, name }: {score: ScoreEntity, limit: number, name: string}) {
    await this.createSnake(score.snakeId, limit)
    await this.createUser({ userId: score.userId, name })
    const scoreCreated = await this._scoreRepo.createScore(score)
    return scoreCreated
  }

  async createSnake (snakeId: number, limit: number) {
    const createdSnake = await this._snakeService.createSnakeHead(snakeId, limit)
    return createdSnake
  }

  async createUser (user: UserEntity) {
    const userCreated = await this._userService.createUser(user)
    return userCreated
  }

  async eraseScore (scoreId: number) {
    const { snakeId, userId } = await this.getOneScoreFulfillCondition({ scoreId })
    await this._snakeService.eraseSnake(snakeId)
    await this._userService.eraseUser(userId)
    await this._scoreRepo.eraseScore(scoreId)
  }

  async erateAllScoresInMatchGame (matchGameId: number) {
    const allScoresInMatchGame = await this.getAllScoresFulfillCondition({ matchGameId })
    const allScoresPromises = allScoresInMatchGame.map(async (score) => {
      const userId = score.snake.snake.snakeHeadReaded.snakeId
      const scoreId = score.user.userId
      const snakeId = score.score.scoreId
      await this._snakeService.eraseSnake(snakeId)
      await this._userService.eraseUser(userId)
      await this._scoreRepo.eraseScore(scoreId)
    })

    await Promise.all(allScoresPromises)
  }

  async getOneScoreFulfillCondition (criteria: TScoreCriteria): Promise<ScoreEntity> {
    const score = await this._scoreRepo.findOneScoreWhere(criteria)
    return score
  }

  async getAllScoresFulfillCondition (criteria: TScoreCriteria) {
    const allScores = await this._scoreRepo.findAllScoresWhere(criteria)

    const allScoresPromises = allScores.map(async (score) => {
      const snakesReaded = await this.getCompleteSnake(score.snakeId)
      const usersReaded = await this.getUser({ userId: score.userId })
      return { score, snake: snakesReaded, user: usersReaded }
    })

    const allScoresResultsList = await Promise.all(allScoresPromises)

    return allScoresResultsList
  }

  async getCompleteSnake (snakeId: number) {
    const snakeReaded = await this._snakeService.getAllSnake(snakeId)
    return snakeReaded
  }

  async getUser (criteria: TUserCriteria) {
    const snakeReaded = await this._userService.getOneUserFulfillCondition(criteria)
    return snakeReaded
  }

  async getScoreRanking (matchGameId: number) {
    const scoreRanking = await this._scoreRepo.getScoreRanking(matchGameId)
    return scoreRanking
  }

  async updateScore (score: ScoreEntity): Promise<ScoreEntity> {
    const scoreUpdated = await this._scoreRepo.updateScore(score)
    return scoreUpdated
  }
}
