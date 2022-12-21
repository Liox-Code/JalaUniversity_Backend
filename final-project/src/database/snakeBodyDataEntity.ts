import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class SnakeBodyDataEntity {
  @PrimaryColumn()
    snakeBodyId!: number

  @Column()
    snakeId!: number

  @Column()
    snakeIndex!: number

  @Column()
    snakeBodyXAxis!: number

  @Column()
    snakeBodyYAxis!: number
}
