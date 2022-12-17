import { DataSource } from 'typeorm'
import BoardDataEntity from './boardDataEntity'
import SnakeHeadDataEntity from './snakeHeadDataEntity'
import MatchGameDataEntity from './matchGameDataEntity'
import FoodDataEntity from './foodDataEntity'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [SnakeHeadDataEntity, BoardDataEntity, MatchGameDataEntity, FoodDataEntity],
  migrations: [],
  subscribers: []
})
