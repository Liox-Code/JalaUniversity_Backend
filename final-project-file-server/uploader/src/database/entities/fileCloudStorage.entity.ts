import { Column, ObjectIdColumn, Entity } from 'typeorm'

@Entity()
export class FileCloudStorageEntity {
  @ObjectIdColumn()
    _id!: string

  @Column()
    fileId!: string

  @Column()
    cloudStorageId!: string

  @Column()
    uriPath!: string
}
