import { IPhotoEntity } from '../repositories/IPhotoEntity'
import 'reflect-metadata'

export class PhotoEntity implements IPhotoEntity {
  id!: number
  name!: string
  description!: string
  fileName!: string

  constructor (id:number, name:string, description:string, fileName:string) {
    this.id = id
    this.name = name
    this.description = description
    this.fileName = fileName
  }
}
