const TYPES = {
  // Snake
  SnakeBodyEntity: Symbol.for('SnakeBodyEntity'),
  SnakeHeadEntity: Symbol.for('SnakeHeadEntity'),
  SnakeHeadTypeOrmRepository: Symbol.for('SnakeHeadTypeOrmRepository'),
  SnakeHeadService: Symbol.for('SnakeHeadService'),
  // Board
  BoardEntity: Symbol.for('BoardEntity'),
  BoardTypeOrmRepository: Symbol.for('BoardTypeOrmRepository'),
  BoardService: Symbol.for('BoardService'),
  // Match Game
  MatchGameTypeOrmRepository: Symbol.for('MatchGameTypeOrmRepository'),
  MatchGameService: Symbol.for('MatchGameService'),
  // Food
  FoodEntity: Symbol.for('FoodEntity'),
  FoodTypeOrmRepository: Symbol.for('FoodTypeOrmRepository'),
  FoodService: Symbol.for('FoodService')
}

export { TYPES }
