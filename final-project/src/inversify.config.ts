import { Container } from 'inversify'
import { TYPES } from './type.core'
// Snake
import { ISnakeRepository } from './repositories/ISnake.repository'
import { SnakeTypeOrmRepository } from './infraestructure/snakeTypeOrm.repository'
import { SnakeService } from './services/snake.service'
// Board
import { IBoardRepository } from './repositories/IBoard.repository'
import { BoardTypeOrmRepository } from './infraestructure/boardTypeOrm.repository'
import { BoardService } from './services/board.service'
// MatchGame
import { IMatchGameRepository } from './repositories/IMatchGame.repository'
import { MatchGameTypeOrmRepository } from './infraestructure/matchGameTypeOrm.repository'
import { MatchGameService } from './services/matchGame.service'
// Food
import { IFoodRepository } from './repositories/IFood.repository'
import { FoodTypeOrmRepository } from './infraestructure/foodTypeOrm.repository'
import { FoodService } from './services/food.service'

const container = new Container()

// Snake
container.bind<ISnakeRepository>(TYPES.SnakeTypeOrm).to(SnakeTypeOrmRepository)
container.bind<SnakeService>(TYPES.SnakeService).to(SnakeService)

// Board
container.bind<IBoardRepository>(TYPES.BoardTypeOrm).to(BoardTypeOrmRepository)
container.bind<BoardService>(TYPES.BoardService).to(BoardService)

// MatchGame
container.bind<IMatchGameRepository>(TYPES.MatchGameTypeOrm).to(MatchGameTypeOrmRepository)
container.bind<MatchGameService>(TYPES.MatchGameService).to(MatchGameService)

// Food
container.bind<IFoodRepository>(TYPES.FoodTypeOrm).to(FoodTypeOrmRepository)
container.bind<FoodService>(TYPES.FoodService).to(FoodService)

export { container }
