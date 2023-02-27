import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class StoredFileEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column()
    fileId!: string

  @Column()
    driveId!: string

  @Column()
    cloudFileId!: string

  @Column()
    webViewLink!: string

  @Column()
    webContentLink!: string
}
