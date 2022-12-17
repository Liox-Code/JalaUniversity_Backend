import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class SnakeHeadDataEntity {
  @PrimaryColumn()
    snakeId!: number

  @Column()
    snakeHeadXPosition!: number

  @Column()
    snakeHeadYPosition!: number

  @Column()
    snakeSize!: number
}
