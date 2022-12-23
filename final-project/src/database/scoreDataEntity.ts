import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class ScoreDataEntity {
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
