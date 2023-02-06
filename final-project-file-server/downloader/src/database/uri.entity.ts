import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class UriEntity {
  @ObjectIdColumn()
    _id!: string

  @PrimaryColumn()
    uriId!: number

  @Column()
    uriDirection!: string
}
