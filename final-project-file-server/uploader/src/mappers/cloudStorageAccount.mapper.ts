import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { CloudStorageAccountEntity } from '../database/entities/cloudStorageAccount.entity'

export class CloudStorageAccountMapper {
  static toEntity (file: CloudStorageAccountDTO): CloudStorageAccountEntity {
    const fileEntity: CloudStorageAccountEntity = {
      _id: file.cloudStorageId,
      email: file.email,
      key: file.key
    }

    return fileEntity
  }

  static toDTO (file: CloudStorageAccountEntity): CloudStorageAccountDTO {
    const fileDTO: CloudStorageAccountDTO = {
      cloudStorageId: file._id,
      email: file.email,
      key: file.key
    }

    return fileDTO
  }
}
