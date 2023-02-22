import { FileDTO } from '../dto/file.dto'
import { FileEntity } from '../database/entities/file.entity'

export class FileMapper {
  static toEntity (file: FileDTO): FileEntity {
    const fileEntity: FileEntity = {
      id: file.id,
      name: file.name,
      size: file.size,
      numberDownloads: file.numberDownloads,
      totalSizeDownloads: file.totalSizeDownloads
    }

    return fileEntity
  }

  static toDTO (file: FileEntity): FileDTO {
    const fileDTO: FileDTO = {
      id: file.id,
      name: file.name,
      size: file.size,
      numberDownloads: file.numberDownloads,
      totalSizeDownloads: file.totalSizeDownloads
    }

    return fileDTO
  }
}
