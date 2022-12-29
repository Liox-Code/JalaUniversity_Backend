import { Column, ObjectIdColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class FoodDataEntity {
  @ObjectIdColumn()
    _id!: string

  @PrimaryColumn()
    foodId!: number

  @Column()
    foodXPosition!: number

  @Column()
    foodYPosition!: number
}
