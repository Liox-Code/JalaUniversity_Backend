import { Column, ObjectIdColumn, Entity } from 'typeorm'

@Entity()
export class FileEntity {
  @ObjectIdColumn()
    _id!: string

  @Column()
    fileName!: string

  @Column()
    size!: string

  @Column()
    status!: string
}
