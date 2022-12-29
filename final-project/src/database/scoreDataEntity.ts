import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class ScoreDataEntity {
  @ObjectIdColumn()
    _id!: string

  @PrimaryColumn()
    scoreId!: number

  @Column()
    matchGameId!: number

  @Column()
    userId!: number

  @Column()
    snakeId!: number

  @Column()
    score!: number
}
