import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class FileEntity {
  @PrimaryColumn()
    id!: string

  @Column()
    fileId!: string

  @Column()
    name!: string

  @Column()
    size!: number

  @Column()
    numberDownloads!: number

  @Column()
    totalSizeDownloads!: number
}
