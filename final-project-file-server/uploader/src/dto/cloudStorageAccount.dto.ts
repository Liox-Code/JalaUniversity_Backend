export class CloudStorageAccountDTO {
  cloudStorageId: string
  email: string
  key: number

  constructor (
    cloudStorageId: string,
    email: string,
    key: number
  ) {
    this.cloudStorageId = cloudStorageId
    this.email = email
    this.key = key
  }
}
