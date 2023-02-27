import { DownloadDTO } from '../dto/download.dto'
import { DownloadEntity } from '../database/entities/download.entity'

export class DownloadMapper {
  static toEntity (downloadDTO: DownloadDTO): DownloadEntity {
    const download: DownloadEntity = {
      id: downloadDTO.id,
      storedFileId: downloadDTO.storedFileId,
      createdAt: downloadDTO.createdAt
    }

    return download
  }

  static toDTO (download: DownloadEntity): DownloadDTO {
    const downloadDTO: DownloadDTO = {
      id: download.id,
      storedFileId: download.storedFileId,
      createdAt: download.createdAt
    }

    return downloadDTO
  }
}
