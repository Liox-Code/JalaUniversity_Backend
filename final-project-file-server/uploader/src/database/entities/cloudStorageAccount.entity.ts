import { ObjectId } from 'mongodb'
import { Column, ObjectIdColumn, Entity } from 'typeorm'

@Entity()
export class CloudStorageAccountEntity {
  @ObjectIdColumn()
    _id!: ObjectId

  @Column()
    email!: string

  @Column()
    credentialClientID!: string

  @Column()
    credentialSecret!: string

  @Column()
    credentialRedirecrUri!: string

  @Column()
    credentialRefreshToken!: string
}
