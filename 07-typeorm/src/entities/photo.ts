import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class Photo {
  @PrimaryColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    description!: string

  @Column()
    fileName!: string
}
