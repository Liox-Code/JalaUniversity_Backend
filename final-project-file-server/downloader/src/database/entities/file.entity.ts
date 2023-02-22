import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    name!: string

  @Column()
    size!: number

  @Column()
    numberDownloads!: number

  @Column()
    totalSizeDownloads!: number
}
