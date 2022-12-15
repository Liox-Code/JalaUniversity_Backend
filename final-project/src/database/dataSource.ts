import { DataSource } from 'typeorm'
import BoardDataEntity from './boardDataEntity'
import SnakeDataEntity from './snakeDataEntity'
import MatchGameDataEntity from './matchGameDataEntity'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [SnakeDataEntity, BoardDataEntity, MatchGameDataEntity],
  migrations: [],
  subscribers: []
})
