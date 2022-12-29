import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class SnakeDataEntity {
  @ObjectIdColumn()
    _id!: string

  @PrimaryColumn()
    snakeId!: number

  @Column()
    snakeDirection!: string

  @Column()
    snakeHeadXPosition!: number

  @Column()
    snakeHeadYPosition!: number

  @Column()
    snakeSize!: number
}
