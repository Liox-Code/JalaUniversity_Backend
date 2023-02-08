import { UriRepository } from '../database/repositories/uri.repository'
import { UriDTO } from '../dto/uri.dto'
import { IUriRepository } from '../types/IUriRepository.type'

export class UriService {
  private uriRepository: IUriRepository

  constructor () {
    this.uriRepository = new UriRepository()
  }

  createUri = async (uri: UriDTO) => {
    return await this.uriRepository.createUri(uri)
  }

  readUri = async (uriId: string) => {
    return await this.uriRepository.readUri(uriId)
  }

  updateUri = async (uri: UriDTO) => {
    return await this.uriRepository.updateUri(uri)
  }

  deleteUri = async (uriId: string) => {
    return await this.uriRepository.deleteUri(uriId)
  }
}
