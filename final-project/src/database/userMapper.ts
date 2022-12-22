import { UserEntity } from '../core/domain/entities/user.entity'
import UserDataEntity from './userDataEntity'

export class UserMapper {
  static toEntity (user: UserDataEntity): UserEntity {
    const userEntity: UserEntity = {
      userId: user.userId,
      name: user.name
    }

    return userEntity
  }

  static toDataEntity (user: UserEntity): UserDataEntity {
    const userDataEntity: UserDataEntity = {
      userId: user.userId,
      name: user.name
    }

    return userDataEntity
  }
}
