import { DataSource } from 'typeorm'
import BoardDataEntity from './boardDataEntity'
import SnakeDataEntity from './snakeDataEntity'
import SnakeBodyDataEntity from './snakeBodyDataEntity'
import MatchGameDataEntity from './matchGameDataEntity'
import FoodDataEntity from './foodDataEntity'
import ScoreDataEntity from './scoreDataEntity'
import UserDataEntity from './userDataEntity'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'snakegame',
  synchronize: true,
  logging: false,
  entities: [
    SnakeDataEntity,
    SnakeBodyDataEntity,
    BoardDataEntity,
    MatchGameDataEntity,
    FoodDataEntity,
    ScoreDataEntity,
    UserDataEntity
  ],
  migrations: [],
  subscribers: []
})
