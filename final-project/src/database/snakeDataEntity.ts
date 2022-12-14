import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class SnakeDataEntity {
  @PrimaryColumn()
    snakeId!: number

  @Column()
    snakeHeadXPosition!: number

  @Column()
    snakeHeadYPosition!: number

  @Column()
    snakeSize!: number
}
