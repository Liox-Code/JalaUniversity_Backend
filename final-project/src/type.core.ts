const TYPES = {
  // Snake
  SnakeHeadTypeOrmRepository: Symbol.for('SnakeHeadTypeOrmRepository'),
  SnakeService: Symbol.for('SnakeService'),
  // Board
  BoardTypeOrmRepository: Symbol.for('BoardTypeOrmRepository'),
  BoardService: Symbol.for('BoardService'),
  // Match Game
  MatchGameTypeOrmRepository: Symbol.for('MatchGameTypeOrmRepository'),
  MatchGameService: Symbol.for('MatchGameService'),
  // Food
  FoodTypeOrmRepository: Symbol.for('FoodTypeOrmRepository'),
  FoodService: Symbol.for('FoodService'),
  // Random Generator
  RandomGeneratorService: Symbol.for('RandomGeneratorService')
}

export { TYPES }
