import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm'

@Entity()
export default class SnakeBodyDataEntity {
  @ObjectIdColumn()
    _id!: string

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
