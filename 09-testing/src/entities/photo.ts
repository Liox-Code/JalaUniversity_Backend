import { injectable } from 'inversify'
import { IPhoto } from '../interfaces/IPhoto'
import { Column, PrimaryColumn } from 'typeorm'
import 'reflect-metadata'

@injectable()
export default class Photo implements IPhoto {
  @PrimaryColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    description!: string

  @Column()
    fileName!: string

  create: () => void
  read: () => void
  update: () => void
  delete: () => void
}
