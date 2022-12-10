// import { Repository } from 'typeorm'
import { IPhotoRepository } from '../repositories/IPhotoRepository'
import { IPhotoEntity } from '../repositories/IPhotoEntity'
import { PhotoMapper } from './photoMapper'
import PhotoDataEntity from './photoDataEntity'
import { AppDataSource } from './dataSource'
import { injectable } from 'inversify'
import 'reflect-metadata'
import { Repository } from 'typeorm'

@injectable()
export class PhotoDataAccess implements IPhotoRepository {
  private readonly repository: Repository<PhotoDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(PhotoDataEntity)
  }

  async initilizeDb (): Promise<void> {
    await AppDataSource.initialize()
  }

  async read (id: number): Promise<IPhotoEntity> {
    const data = await this.repository.findOneBy({ id })
    return PhotoMapper.toEntity(data)
  }

  async create (photo: IPhotoEntity): Promise<IPhotoEntity> {
    const data = await this.repository.save(PhotoMapper.toDataEntity(photo))
    return PhotoMapper.toEntity(data)
  }

  async update (photo: IPhotoEntity): Promise<IPhotoEntity> {
    const data = await this.repository.save(PhotoMapper.toDataEntity(photo))
    return PhotoMapper.toEntity(data)
  }

  async delete (id: number): Promise<void> {
    await this.repository.delete({ id })
    console.log('DELETED')
  }
}
