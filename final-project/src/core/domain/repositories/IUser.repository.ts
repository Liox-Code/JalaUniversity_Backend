import { UserEntity } from '../entities/user.entity'

export type TUserProps = {
  userId?: number
  name?: string
}

export type TUserCriteria = {userId: number}

export interface IUserRepository {
  createUser: (user: UserEntity) => Promise<UserEntity>
  findOneUserWhere: (userCriteria: TUserCriteria) => Promise<UserEntity >
  findAllUsersWhere: (userCriteria: TUserCriteria) => Promise<UserEntity[]>
  updateUser: (user: TUserProps) => Promise<UserEntity>
  eraseUser: (userId: number) => Promise<void>
}
