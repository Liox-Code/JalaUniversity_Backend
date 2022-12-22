import { EMatchGameState, MatchGameEntity } from '../../../src/core/domain/entities/matchGame.entity'

export const matchGamePropsMock: MatchGameEntity = {
  matchGameId: 1,
  boardId: 1,
  foodId: 1,
  snakeId: 1,
  matchGameState: EMatchGameState.Ready
}
