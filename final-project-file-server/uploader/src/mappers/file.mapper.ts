import { FileDTO } from '../dto/file.dto'
import { FileEntity } from '../database/entities/file.entity'

export class FileMapper {
  static toEntity (file: FileDTO): FileEntity {
    const fileEntity: FileEntity = {
      fileName: file.fileName,
      mimeType: file.mimeType,
      size: file.size,
      status: file.status
    }

    return fileEntity
  }

  static toDTO (file: FileEntity, content: Buffer): FileDTO {
    const fileDTO: FileDTO = {
      fileName: file.fileName,
      mimeType: file.mimeType,
      size: file.size,
      status: file.status,
      content
    }

    return fileDTO
  }
}
