import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class PhotoDataEntity {
  @PrimaryColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    description!: string

  @Column()
    fileName!: string
}
