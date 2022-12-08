import { DataSource } from 'typeorm'
import PhotoEntity from './entities/photo.entity'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [PhotoEntity],
  migrations: [],
  subscribers: []
})
