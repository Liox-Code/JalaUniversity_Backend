import { inject, injectable } from 'inversify'
import { TYPES } from '../../../type.core'
import { UserEntity } from '../entities/user.entity'
import { IUserRepository, TUserCriteria } from '../repositories/IUser.repository'

@injectable()
export class UserService {
  private readonly _userRepo: IUserRepository

  constructor (
    @inject(TYPES.UserTypeOrmRepository) userRepo: IUserRepository
  ) {
    this._userRepo = userRepo
  }

  async createUser (score: UserEntity) {
    const userCreated = await this._userRepo.createUser(score)
    return userCreated
  }

  async getOneUserFulfillCondition (criteria: TUserCriteria): Promise<UserEntity> {
    const user = await this._userRepo.findOneUserWhere(criteria)
    return user
  }

  async getAllUsersFulfillCondition (criteria: TUserCriteria): Promise<UserEntity[]> {
    const allUsers = await this._userRepo.findAllUsersWhere(criteria)
    return allUsers
  }

  async updateUser (criteria: TUserCriteria): Promise<UserEntity> {
    const user = await this._userRepo.updateUser(criteria)
    return user
  }

  async eraseUser (userId: number) {
    await this._userRepo.eraseUser(userId)
  }
}
