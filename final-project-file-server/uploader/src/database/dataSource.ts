import { DataSource } from 'typeorm'
import { FileEntity } from './entities/file.entity'
import { CloudStorageAccountEntity } from './entities/cloudStorageAccount.entity'
import { StoreFileEntity } from './entities/storeFile.entity'
import { MongoClient } from 'mongodb'

export const DATABASE_NAME = 'uploader'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: DATABASE_NAME,
  synchronize: true,
  logging: ['query', 'error'],
  // useUnifiedTopology: true,
  entities: [FileEntity, CloudStorageAccountEntity, StoreFileEntity],
  migrations: [],
  subscribers: []
})

const uri = 'mongodb://127.0.0.1:27017'
export const client = new MongoClient(uri)
client.connect((error) => {
  if (error) {
    throw new Error(`Datasource ${error}`)
  }
})
