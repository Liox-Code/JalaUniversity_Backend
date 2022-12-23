import { injectable } from 'inversify'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import 'reflect-metadata'
import UserDataEntity from '../database/userDataEntity'
import { UserEntity } from '../core/domain/entities/user.entity'
import { IUserRepository, TUserCriteria, TUserProps } from '../core/domain/repositories/IUser.repository'
import { UserMapper } from '../database/userMapper'

@injectable()
export class UserTypeOrmRepository implements IUserRepository {
  private readonly repository: Repository<UserDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(UserDataEntity)
  }

  async createUser (user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.repository.save(UserMapper.toDataEntity(user))
    return UserMapper.toEntity(createdUser)
  }

  async findOneUserWhere (userCriteria: TUserCriteria): Promise<UserEntity> {
    const foundScore = await this.repository.findOneBy(userCriteria)
    if (!foundScore) {
      throw new Error(`User with criteria ${userCriteria} not found`)
    }
    return UserMapper.toEntity(foundScore)
  }

  async findAllUsersWhere (userCriteria: TUserCriteria): Promise<UserEntity[]> {
    return await this.repository.findBy(userCriteria)
  }

  async updateUser (user: TUserProps): Promise<UserEntity> {
    const createdUser = await this.repository.save(user)
    return UserMapper.toEntity(createdUser)
  }

  async eraseUser (userId: number): Promise<void> {
    const options: FindManyOptions<UserDataEntity> = {
      where: { userId }
    }
    const userDataBodyArray = await this.repository.find(options)
    await this.repository.remove(userDataBodyArray)
  }
}
