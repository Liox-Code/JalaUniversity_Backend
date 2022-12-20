import { Container } from 'inversify'
import { TYPES } from './type.core'
// Snake
import { SnakeEntity } from './core/domain/entities/snake.entity'
import { ISnakeRepository } from './core/domain/repositories/ISnakeHead.repository'
import { SnakeTypeOrmRepository } from './infraestructure/snakeTypeOrm.repository'
import { SnakeService } from './core/domain/services/snake.service'
// Board
import { IBoardRepository } from './core/domain/repositories/IBoard.repository'
import { BoardEntity } from './core/domain/entities/board.entity'
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
import { FoodEntity } from './core/domain/entities/food.entity'
// Random Generator
import { RandomGeneratorService } from './core/domain/services/RandomGeneratorService'

const container = new Container()

// Snake
container.bind<SnakeEntity>(TYPES.SnakeEntity).to(SnakeEntity)
container.bind<ISnakeRepository>(TYPES.SnakeHeadTypeOrmRepository).to(SnakeTypeOrmRepository)
container.bind<SnakeService>(TYPES.SnakeHeadService).to(SnakeService)

// Board
container.bind<BoardEntity>(TYPES.BoardEntity).to(BoardEntity)
container.bind<IBoardRepository>(TYPES.BoardTypeOrmRepository).to(BoardTypeOrmRepository)
container.bind<BoardService>(TYPES.BoardService).to(BoardService)

// MatchGame
container.bind<IMatchGameRepository>(TYPES.MatchGameTypeOrmRepository).to(MatchGameTypeOrmRepository)
container.bind<MatchGameService>(TYPES.MatchGameService).to(MatchGameService)

// Food
container.bind<FoodEntity>(TYPES.FoodEntity).to(FoodEntity)
container.bind<IFoodRepository>(TYPES.FoodTypeOrmRepository).to(FoodTypeOrmRepository)
container.bind<FoodService>(TYPES.FoodService).to(FoodService)

// Random Generator
container.bind<RandomGeneratorService>(TYPES.RandomGeneratorService).to(RandomGeneratorService)

export { container }
