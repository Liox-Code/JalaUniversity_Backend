import { Container } from 'inversify'
import { TYPES } from '../../src/type.core'
import 'reflect-metadata'
import { UserService } from '../../src/core/domain/services/user.service'
import { UserTypeOrmRepositoryMock } from './__mocks__/userRepositoryMock'

let component:UserService
beforeEach(async () => {
  const container = new Container()
  container.bind<UserTypeOrmRepositoryMock>(TYPES.UserTypeOrmRepository).to(UserTypeOrmRepositoryMock)
  container.bind<UserService>(TYPES.UserService).to(UserService)
  component = container.get<UserService>(TYPES.UserService)
})

test('Create a user', async () => {
  console.log()
})
