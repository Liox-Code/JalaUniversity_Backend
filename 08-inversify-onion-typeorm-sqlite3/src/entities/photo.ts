import 'reflect-metadata'
import { injectable } from 'inversify'
import { IPhoto } from '../interfaces/IPhoto'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@injectable()
@Entity()
class Photo implements IPhoto {
    @PrimaryColumn()
        id!: number

    @Column()
        name!: string

    @Column()
        description!: string

    @Column()
        fileName!: string
}

export default Photo
