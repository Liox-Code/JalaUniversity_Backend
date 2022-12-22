import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class ScoreDataEntity {
  @PrimaryColumn()
    scoreId!: number

  @Column()
    matchId!: number

  @Column()
    userId!: number

  @Column()
    snakeId!: number

  @Column()
    score!: number
}
