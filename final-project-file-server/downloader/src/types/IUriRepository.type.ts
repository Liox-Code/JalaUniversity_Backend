import { UriDTO } from '../dto/uri.dto'

export interface IUriRepository {
  createUri: (uriId: UriDTO) => Promise<UriDTO>
  readUri: (uriId: string) => Promise<UriDTO>
  updateUri: (uri: UriDTO) => Promise<true>
  deleteUri: (uriId: string) => Promise<boolean>
}
