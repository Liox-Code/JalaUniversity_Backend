import { DataSource } from 'typeorm'
import { FileEntity } from './entities/file.entity'
import { CloudStorageAccountEntity } from './entities/cloudStorageAccount.entity'
import { FileCloudStorageEntity } from './entities/fileCloudStorage.entity'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'uploader',
  synchronize: true,
  logging: ['query', 'error'],
  // useUnifiedTopology: true,
  entities: [FileEntity, CloudStorageAccountEntity, FileCloudStorageEntity],
  migrations: [],
  subscribers: []
})
