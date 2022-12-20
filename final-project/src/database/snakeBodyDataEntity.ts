import { Column, Entity } from 'typeorm'

@Entity()
export default class SnakeBodyDataEntity {
  @Column()
    snakeId!: number

  @Column()
    snakeBodyXAxis!: number

  @Column()
    snakeBodyYAxis!: number
}
