import { UriDTO } from '../dto/uri.dto'
import { UriEntity } from '../database/entities/uri.entity'

export class UriMapper {
  static toEntity (uri: UriDTO): UriEntity {
    const uriEntity: UriEntity = {
      uriId: uri.uriId,
      uriDirection: uri.uriDirection
    }

    return uriEntity
  }

  static toDTO (uri: UriEntity): UriDTO {
    const uriDTO: UriDTO = {
      uriId: uri.uriId,
      uriDirection: uri.uriDirection
    }

    return uriDTO
  }
}
