import { FileDTO } from '../dto/file.dto'
import { FileEntity } from '../database/entities/file.entity'

export class FileMapper {
  static toEntity (file: FileDTO): FileEntity {
    const fileEntity: FileEntity = {
      _id: file.fileId,
      fileName: file.fileName,
      size: file.size,
      status: file.status
    }

    return fileEntity
  }

  static toDTO (file: FileEntity): FileDTO {
    const fileDTO: FileDTO = {
      fileId: file._id,
      fileName: file.fileName,
      size: file.size,
      status: file.status
    }

    return fileDTO
  }
}
