export class CloudStorageAccountDTO {
  cloudStorageAccountId: string
  email: string
  credentialClientID: string
  credentialSecret: string
  credentialRedirecrUri: string
  credentialRefreshToken: string

  constructor (
    cloudStorageAccountId: string,
    email: string,
    credentialClientID: string,
    credentialSecret: string,
    credentialRedirecrUri: string,
    credentialRefreshToken: string
  ) {
    this.cloudStorageAccountId = cloudStorageAccountId
    this.email = email
    this.credentialClientID = credentialClientID
    this.credentialSecret = credentialSecret
    this.credentialRedirecrUri = credentialRedirecrUri
    this.credentialRefreshToken = credentialRefreshToken
  }
}
