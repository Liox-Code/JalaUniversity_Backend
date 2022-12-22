const TYPES = {
  // Snake
  SnakeHeadTypeOrmRepository: Symbol.for('SnakeHeadTypeOrmRepository'),
  SnakeBodyTypeOrmRepository: Symbol.for('SnakeBodyTypeOrmRepository'),
  SnakeService: Symbol.for('SnakeService'),
  // Board
  BoardTypeOrmRepository: Symbol.for('BoardTypeOrmRepository'),
  BoardService: Symbol.for('BoardService'),
  // Match Game
  MatchGameTypeOrmRepository: Symbol.for('MatchGameTypeOrmRepository'),
  MatchGameService: Symbol.for('MatchGameService'),
  MatchGameController: Symbol.for('MatchGameController'),
  // Food
  FoodTypeOrmRepository: Symbol.for('FoodTypeOrmRepository'),
  FoodService: Symbol.for('FoodService'),
  // Score
  ScoreTypeOrmRepository: Symbol.for('ScoreTypeOrmRepository'),
  ScoreService: Symbol.for('ScoreService'),
  // User
  UserTypeOrmRepository: Symbol.for('UserTypeOrmRepository'),
  UserService: Symbol.for('UserService'),
  // Random Generator
  RandomGeneratorService: Symbol.for('RandomGeneratorService')
}

export { TYPES }
