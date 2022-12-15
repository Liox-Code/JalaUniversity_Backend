import { UserRepository } from './userRepository'

export class User implements UserRepository {
  Insert () {
    console.log('User Insert')
  }

  Get () {
    console.log('User Get')
  }

  Update () {
    console.log('User Update')
  }

  Delete () {
    console.log('User Delete')
  }
}
