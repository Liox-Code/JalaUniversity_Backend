import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class SnakeBodyDataEntity {
  @PrimaryColumn()
    snakeBodyId!: number

  @Column()
    snakeId!: number

  @Column()
    snakeBodyXAxis!: number

  @Column()
    snakeBodyYAxis!: number
}
