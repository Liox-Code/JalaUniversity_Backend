import { injectable } from 'inversify'
import { IPhotoRepository } from '../repositories/IPhoto.repository'
import { Column, PrimaryColumn } from 'typeorm'
import 'reflect-metadata'

@injectable()
export default class PhotoEntities implements IPhotoRepository {
  @PrimaryColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    description!: string

  @Column()
    fileName!: string

  create () {
    console.log('create')
  }

  read () {
    console.log('read')
  }

  update () {
    console.log('update')
  }

  delete () {
    console.log('delete')
  }
}
