import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class FileEntity {
  @ObjectIdColumn()
    _id!: string

  @PrimaryColumn()
    fileId!: number

  @Column()
    fileName!: string

  @Column()
    direction!: string
}
