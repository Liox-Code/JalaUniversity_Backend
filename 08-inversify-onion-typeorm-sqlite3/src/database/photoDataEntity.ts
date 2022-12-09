import { IPhotoEntity } from '../repositories/IPhotoEntity'
import { Column, PrimaryColumn, Entity } from 'typeorm'
import 'reflect-metadata'

@Entity()
export class PhotoDataEntity implements IPhotoEntity {
  @PrimaryColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    description!: string

  @Column()
    fileName!: string
}
