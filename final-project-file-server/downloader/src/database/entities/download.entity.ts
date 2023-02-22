import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class DownloadEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    storedFileId!: string

  @CreateDateColumn()
    createdAt!: Date
}
