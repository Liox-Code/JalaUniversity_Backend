// import { Repository } from 'typeorm'
import { IPhotoRepository } from '../repositories/IPhotoRepository'
import { IPhotoEntity } from '../repositories/IPhotoEntity'
import PhotoDataEntity from './photoDataEntity'
import { AppDataSource } from './dataSource'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export class PhotoDataAccess implements IPhotoRepository {
  // private readonly repository: Repository<PhotoDataEntity>

  // constructor () {
  //   this.repository = AppDataSource.getRepository(PhotoDataEntity)
  // }

  async initilizeDb (): Promise<void> {
    await AppDataSource.initialize()
  }

  async read (id: number): Promise<void> {
    const repository = await AppDataSource.getRepository(PhotoDataEntity)
    const data = await repository.findOneBy({ id })
    console.log(data)
    console.log('READ')
  }

  async create (photo: IPhotoEntity): Promise<void> {
    const repository = await AppDataSource.getRepository(PhotoDataEntity)
    await repository.save(photo)
    console.log('CREATE')
  }

  async update (id: number, photo: IPhotoEntity): Promise<void> {
    const repository = AppDataSource.getRepository(PhotoDataEntity)
    repository.save(photo)
    console.log('UPDATE')
  }

  async delete (id: number): Promise<void> {
    const repository = AppDataSource.getRepository(PhotoDataEntity)
    await repository.delete({ id })
    console.log('DELETE')
  }
}
