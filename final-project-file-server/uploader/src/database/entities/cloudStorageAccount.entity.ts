import { Column, ObjectIdColumn, Entity } from 'typeorm'

@Entity()
export class CloudStorageAccountEntity {
  @ObjectIdColumn()
    _id!: string

  @Column()
    email!: string

  @Column()
    key!: number
}
