import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class UserDataEntity {
  @ObjectIdColumn()
    _id!: string

  @PrimaryColumn()
    userId!: number

  @Column()
    name!: string
}
