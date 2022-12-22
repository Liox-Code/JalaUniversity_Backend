import { Container } from 'inversify'
import { TYPES } from './type.core'
// Snake
import { ISnakeHeadRepository } from './core/domain/repositories/ISnakeHead.repository'
import { SnakeBodyTypeOrmRepository } from './infraestructure/snakeBodyTypeOrm.repository'
import { ISnakeBodyRepository } from './core/domain/repositories/ISnakeBody.repository'
import { SnakeHeadTypeOrmRepository } from './infraestructure/snakeHeadTypeOrm.repository'
import { SnakeService } from './core/domain/services/snake.service'
// Board
import { IBoardRepository } from './core/domain/repositories/IBoard.repository'
import { BoardTypeOrmRepository } from './infraestructure/boardTypeOrm.repository'
import { BoardService } from './core/domain/services/board.service'
// MatchGame
import { IMatchGameRepository } from './core/domain/repositories/IMatchGame.repository'
import { MatchGameTypeOrmRepository } from './infraestructure/matchGameTypeOrm.repository'
import { MatchGameService } from './core/domain/services/matchGame.service'
// Food
import { IFoodRepository } from './core/domain/repositories/IFood.repository'
import { FoodTypeOrmRepository } from './infraestructure/foodTypeOrm.repository'
import { FoodService } from './core/domain/services/food.service'
// Random Generator
import { RandomGeneratorService } from './core/domain/services/randomGeneratorService'
import MatchGameController from './application/controller/matchGame.controller'
// User
import { IUserRepository } from './core/domain/repositories/IUser.repository'
import { UserTypeOrmRepository } from './infraestructure/userTypeOrm.repository'
import { UserService } from './core/domain/services/user.service'
// Score
import { ScoreTypeOrmRepository } from './infraestructure/scoreTypeOrm.repository'
import { IScoreRepository } from './core/domain/repositories/IScore.repository'
import { ScoreService } from './core/domain/services/score.service'

const container = new Container()

// Snake
container.bind<ISnakeHeadRepository>(TYPES.SnakeHeadTypeOrmRepository).to(SnakeHeadTypeOrmRepository)
container.bind<ISnakeBodyRepository>(TYPES.SnakeBodyTypeOrmRepository).to(SnakeBodyTypeOrmRepository)
container.bind<SnakeService>(TYPES.SnakeService).to(SnakeService)

// Board
container.bind<IBoardRepository>(TYPES.BoardTypeOrmRepository).to(BoardTypeOrmRepository)
container.bind<BoardService>(TYPES.BoardService).to(BoardService)

// MatchGame
container.bind<IMatchGameRepository>(TYPES.MatchGameTypeOrmRepository).to(MatchGameTypeOrmRepository)
container.bind<MatchGameService>(TYPES.MatchGameService).to(MatchGameService).inSingletonScope()
container.bind<MatchGameController>(TYPES.MatchGameController).to(MatchGameController)

// Food
container.bind<IFoodRepository>(TYPES.FoodTypeOrmRepository).to(FoodTypeOrmRepository)
container.bind<FoodService>(TYPES.FoodService).to(FoodService)

// User
container.bind<IUserRepository>(TYPES.UserTypeOrmRepository).to(UserTypeOrmRepository)
container.bind<UserService>(TYPES.UserService).to(UserService)

// Score
container.bind<IScoreRepository>(TYPES.ScoreTypeOrmRepository).to(ScoreTypeOrmRepository)
container.bind<ScoreService>(TYPES.ScoreService).to(ScoreService)

// Random Generator
container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)

export { container }
