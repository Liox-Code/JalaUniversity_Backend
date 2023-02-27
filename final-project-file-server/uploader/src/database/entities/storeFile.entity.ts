import { ObjectId } from 'mongodb'
import { Column, ObjectIdColumn, Entity } from 'typeorm'

@Entity()
export class StoreFileEntity {
  @ObjectIdColumn()
    _id?: ObjectId

  @Column()
    cloudStorageAccountId!: ObjectId

  @Column()
    fileId!: ObjectId

  @Column()
    cloudFileId!: string

  @Column()
    webViewLink!: string

  @Column()
    webContentLink!: string
}
