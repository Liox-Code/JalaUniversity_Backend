import { Container } from 'inversify'
import { TYPES } from './type.core'
// Snake
import { ISnakeRepository } from './core/domain/repositories/ISnake.repository'
import { SnakeTypeOrmRepository } from './infraestructure/snakeTypeOrm.repository'
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
import { RandomGeneratorService } from './core/domain/services/RandomGeneratorService'

const container = new Container()

// Snake
container.bind<ISnakeRepository>(TYPES.SnakeHeadTypeOrmRepository).to(SnakeTypeOrmRepository)
container.bind<SnakeService>(TYPES.SnakeService).to(SnakeService)

// Board
container.bind<IBoardRepository>(TYPES.BoardTypeOrmRepository).to(BoardTypeOrmRepository)
container.bind<BoardService>(TYPES.BoardService).to(BoardService)

// MatchGame
container.bind<IMatchGameRepository>(TYPES.MatchGameTypeOrmRepository).to(MatchGameTypeOrmRepository)
container.bind<MatchGameService>(TYPES.MatchGameService).to(MatchGameService)

// Food
container.bind<IFoodRepository>(TYPES.FoodTypeOrmRepository).to(FoodTypeOrmRepository)
container.bind<FoodService>(TYPES.FoodService).to(FoodService)

// Random Generator
container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)

export { container }
