import { DataSource } from 'typeorm'
import { UriEntity } from '../database/entities/uri.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'downloader',
  synchronize: true,
  logging: false,
  entities: [
    UriEntity
  ],
  migrations: [],
  subscribers: []
})
