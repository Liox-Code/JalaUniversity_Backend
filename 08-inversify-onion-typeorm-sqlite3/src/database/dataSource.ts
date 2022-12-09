import { DataSource } from 'typeorm'
import PhotoDataEntity from './photoDataEntity'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [PhotoDataEntity],
  migrations: [],
  subscribers: []
})
