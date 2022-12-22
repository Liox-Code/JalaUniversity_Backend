import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class MatchGameDataEntity {
  @PrimaryColumn()
    matchGameId!: number

  @Column()
    boardId!: number

  @Column()
    snakeId!: number

  @Column()
    foodId!: number

  @Column()
    matchGameState!:string
}
