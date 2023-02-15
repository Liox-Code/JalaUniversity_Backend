import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { CloudStorageAccountEntity } from '../database/entities/cloudStorageAccount.entity'

export class CloudStorageAccountMapper {
  static toEntity (cloudStorageAccount: CloudStorageAccountDTO): CloudStorageAccountEntity {
    const cloudStorageAccountEntity: CloudStorageAccountEntity = {
      id: cloudStorageAccount.id,
      email: cloudStorageAccount.email,
      numberDownloads: cloudStorageAccount.numberDownloads,
      totalSizeDownloads: cloudStorageAccount.totalSizeDownloads
    }

    return cloudStorageAccountEntity
  }

  static toDTO (cloudStorageAccount: CloudStorageAccountEntity): CloudStorageAccountDTO {
    const cloudStorageAccountDTO: CloudStorageAccountDTO = {
      id: cloudStorageAccount.id,
      email: cloudStorageAccount.email,
      numberDownloads: cloudStorageAccount.numberDownloads,
      totalSizeDownloads: cloudStorageAccount.totalSizeDownloads
    }

    return cloudStorageAccountDTO
  }
}
