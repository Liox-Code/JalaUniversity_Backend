import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class FoodDataEntity {
  @PrimaryColumn()
    foodId!: number

  @Column()
    foodXPosition!: number

  @Column()
    foodYPosition!: number
}
