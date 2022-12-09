import { Column, PrimaryColumn, Entity } from 'typeorm'
import { IPhotoEntity } from '../repositories/IPhotoEntity'

@Entity()
export default class PhotoDataEntity implements IPhotoEntity {
  @PrimaryColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    description!: string

  @Column()
    fileName!: string
}
