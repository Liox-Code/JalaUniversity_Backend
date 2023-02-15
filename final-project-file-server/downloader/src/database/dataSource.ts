import { DataSource } from 'typeorm'
import { StoredFileEntity } from './entities/storedFile.entity'
import { CloudStorageAccountEntity } from './entities/cloudStorageAccount.entity'

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
    StoredFileEntity,
    CloudStorageAccountEntity
  ],
  migrations: [],
  subscribers: []
})
