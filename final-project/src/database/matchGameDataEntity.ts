import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class MatchGameDataEntity {
  @ObjectIdColumn()
    _id!: string

  @PrimaryColumn()
    matchGameId!: number

  @Column()
    boardId!: number

  @Column()
    foodId!: number

  @Column()
    matchGameState!:string
}
