export class CloudStorageAccountDTO {
  email: string
  credentialClientID: string
  credentialSecret: string
  credentialRedirecrUri: string
  credentialRefreshToken: string

  constructor (
    email: string,
    credentialClientID: string,
    credentialSecret: string,
    credentialRedirecrUri: string,
    credentialRefreshToken: string
  ) {
    this.email = email
    this.credentialClientID = credentialClientID
    this.credentialSecret = credentialSecret
    this.credentialRedirecrUri = credentialRedirecrUri
    this.credentialRefreshToken = credentialRefreshToken
  }
}
