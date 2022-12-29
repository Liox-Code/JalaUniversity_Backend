import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class BoardDataEntity {
  @ObjectIdColumn()
    _id!: string

  @PrimaryColumn()
    boardId!: number

  @Column()
    boardSize!: number
}
