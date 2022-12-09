import { IPhotoRepository } from '../repositories/IPhotoRepository'
import { PhotoDataEntity } from './photoDataEntity'
import { IPhotoEntity } from '../repositories/IPhotoEntity'
import { AppDataSource } from './dataSource'
import { injectable } from 'inversify'

@injectable()
export class PhotoDataAccess implements IPhotoRepository {
  async read (id: number): Promise<IPhotoEntity> {
    const repository = AppDataSource.getRepository(PhotoDataEntity)
    return await repository.findOneBy({ id })
  }

  async create (photo: IPhotoEntity): Promise<IPhotoEntity> {
    const repository = AppDataSource.getRepository(PhotoDataEntity)
    return await repository.save(photo)
  }

  async update (id: number, photo: IPhotoEntity): Promise<IPhotoEntity> {
    const repository = AppDataSource.getRepository(PhotoDataEntity)
    return await repository.save(photo)
  }

  async delete (id: number): Promise<void> {
    const repository = AppDataSource.getRepository(PhotoDataEntity)
    console.log(repository)
    // return await repository.delete({ id })
  }
}
