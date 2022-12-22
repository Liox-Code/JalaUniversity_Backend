export class UserEntity {
  userId: number
  name: string

  constructor (
    userId: number,
    name: string
  ) {
    this.userId = userId
    this.name = name
  }
}
