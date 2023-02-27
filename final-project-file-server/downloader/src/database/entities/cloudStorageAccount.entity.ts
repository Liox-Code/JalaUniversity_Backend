import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class CloudStorageAccountEntity {
  @PrimaryColumn()
    id!: string

  @Column()
    email!: string

  @Column()
    numberDownloads!: number

  @Column()
    totalSizeDownloads!: number
}
