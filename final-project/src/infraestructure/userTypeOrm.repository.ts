import { injectable } from 'inversify'
import { FindManyOptions, Repository } from 'typeorm'
import { AppDataSource } from '../database/dataSource'
import 'reflect-metadata'
import UserDataEntity from '../database/userDataEntity'
import { UserEntity } from '../core/domain/entities/user.entity'
import { IUserRepository, TUserCriteria, TUserProps } from '../core/domain/repositories/IUser.repository'
import { UserMapper } from '../database/userMapper'
import { ObjectId } from 'mongodb'

@injectable()
export class UserTypeOrmRepository implements IUserRepository {
  private readonly repository: Repository<UserDataEntity>

  constructor () {
    this.repository = AppDataSource.getMongoRepository(UserDataEntity)
  }

  async createUser (user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.repository.save(UserMapper.toDataEntity(user))
    return UserMapper.toEntity(createdUser)
  }

  async findOneUserWhere (userCriteria: TUserCriteria): Promise<UserEntity> {
    const objectId = new ObjectId(userCriteria.userId)
    const foundScore = await this.repository.findOneBy({ _id: objectId })
    if (!foundScore) {
      throw new Error(`User with criteria ${userCriteria} not found`)
    }
    return UserMapper.toEntity(foundScore)
  }

  async findAllUsersWhere (userCriteria: TUserCriteria): Promise<UserEntity[]> {
    const objectId = new ObjectId(userCriteria.userId)
    const usersData = await this.repository.findBy({ _id: objectId })
    const users = usersData.map((user) => UserMapper.toEntity(user))
    return users
  }

  async updateUser (user: TUserProps): Promise<UserEntity> {
    const createdUser = await this.repository.save(user)
    return UserMapper.toEntity(createdUser)
  }

  async eraseUser (userId: number): Promise<void> {
    const objectId = new ObjectId(userId)
    const options: FindManyOptions<UserDataEntity> = {
      where: { _id: objectId }
    }
    const userDataBodyArray = await this.repository.find(options)
    await this.repository.remove(userDataBodyArray)
  }
}
