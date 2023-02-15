import { ObjectId } from 'mongodb'
import { Column, ObjectIdColumn, Entity } from 'typeorm'

@Entity()
export class FileEntity {
  @ObjectIdColumn()
    _id?: ObjectId

  @Column()
    fileName!: string

  @Column()
    mimeType!: string

  @Column()
    size!: number

  @Column()
    status!: string
}
