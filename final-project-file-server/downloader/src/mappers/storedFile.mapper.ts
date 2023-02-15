import { StoredFileDTO } from '../dto/storedFile.dto'
import { StoredFileEntity } from '../database/entities/storedFile.entity'

export class StoredFileMapper {
  static toEntity (storedFile: StoredFileDTO): StoredFileEntity {
    const storedFileEntity: StoredFileEntity = {
      id: storedFile.id,
      fileId: storedFile.fileId,
      driveId: storedFile.driveId,
      webViewLink: storedFile.webViewLink,
      webContentLink: storedFile.webContentLink
    }

    return storedFileEntity
  }

  static toDTO (storedFile: StoredFileEntity): StoredFileDTO {
    const storedFileDTO: StoredFileDTO = {
      id: storedFile.id,
      fileId: storedFile.fileId,
      driveId: storedFile.driveId,
      webViewLink: storedFile.webViewLink,
      webContentLink: storedFile.webContentLink
    }

    return storedFileDTO
  }
}
