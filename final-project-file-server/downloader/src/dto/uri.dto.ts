export class UriDTO {
  uriId: string
  uriDirection: string

  constructor (
    uriId: string,
    uriDirection: string
  ) {
    this.uriId = uriId
    this.uriDirection = uriDirection
  }
}
