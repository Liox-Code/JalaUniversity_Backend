import { StoreFileDTO } from '../dto/storeFile.dto'
import { StoreFileEntity } from '../database/entities/storeFile.entity'
import { ObjectId } from 'mongodb'

export class StoreFileMapper {
  static toEntity (storeFile: StoreFileDTO): StoreFileEntity {
    const storeFileEntity: StoreFileEntity = {
      fileId: new ObjectId(storeFile.fileId),
      cloudStorageAccountId: new ObjectId(storeFile.cloudStorageAccountId),
      webContentLink: storeFile.webContentLink,
      webViewLink: storeFile.webViewLink
    }

    return storeFileEntity
  }

  static toDTO (storeFile: StoreFileEntity): StoreFileDTO {
    const storeFileDTO: StoreFileDTO = {
      fileId: storeFile.fileId.toString(),
      cloudStorageAccountId: storeFile.cloudStorageAccountId.toString(),
      webContentLink: storeFile.webContentLink,
      webViewLink: storeFile.webViewLink
    }

    return storeFileDTO
  }
}
