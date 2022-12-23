import { injectable } from 'inversify'
import 'reflect-metadata'
import { UserEntity } from '../../../src/core/domain/entities/user.entity'
import { IUserRepository, TUserCriteria, TUserProps } from '../../../src/core/domain/repositories/IUser.repository'
import { userPropsMock } from './userPropsMock'

@injectable()
export class UserTypeOrmRepositoryMock implements IUserRepository {
  async createUser (user: UserEntity) : Promise<UserEntity> {
    return await user
  }

  async findOneUserWhere (userCriteria: TUserCriteria) : Promise<UserEntity> {
    const { userId, name } = userPropsMock
    const user = new UserEntity(userId, name)
    return await user
  }

  async findAllUsersWhere (userCriteria: TUserCriteria) : Promise<UserEntity[]> {
    const { userId, name } = userPropsMock
    const userOne = new UserEntity(userId, name)
    const userTwo = new UserEntity(userId, name)
    return await [userOne, userTwo]
  }

  async updateUser (user: TUserProps) : Promise<UserEntity> {
    const { userId, name } = userPropsMock
    const userData = new UserEntity(userId, name)
    return await userData
  }

  async eraseUser (userId: number) : Promise<void> {
    await console.log('')
  }
}
