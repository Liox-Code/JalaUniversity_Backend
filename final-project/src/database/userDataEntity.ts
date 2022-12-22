import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class UserDataEntity {
  @PrimaryColumn()
    userId!: number

  @Column()
    name!: string
}
