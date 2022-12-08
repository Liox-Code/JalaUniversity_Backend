import { Column, PrimaryColumn, Entity } from 'typeorm'
import 'reflect-metadata'

@Entity()
export default class PhotoEntity {
  @PrimaryColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    description!: string

  @Column()
    fileName!: string

  constructor (id:number, name:string, description:string, fileName:string) {
    this.id = id
    this.name = name
    this.description = description
    this.fileName = fileName
  }
}
