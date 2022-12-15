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
import { MatchGameService } from './services/matchGame.service'
import { MatchGameTypeOrmRepository } from './infraestructure/matchGameTypeOrm.repository'

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

export { container }
