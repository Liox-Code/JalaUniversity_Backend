import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class UriEntity {
  @PrimaryColumn()
    uriId!: string

  @Column()
    uriDirection!: string
}
