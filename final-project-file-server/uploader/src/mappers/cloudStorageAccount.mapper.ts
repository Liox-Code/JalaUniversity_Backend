import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { CloudStorageAccountEntity } from '../database/entities/cloudStorageAccount.entity'

export class CloudStorageAccountMapper {
  static toEntity (cloudStorageAccount: CloudStorageAccountDTO): CloudStorageAccountEntity {
    const cloudStorageAccountEntity: CloudStorageAccountEntity = {
      _id: cloudStorageAccount.cloudStorageId,
      email: cloudStorageAccount.email,
      key: cloudStorageAccount.key
    }

    return cloudStorageAccountEntity
  }

  static toDTO (cloudStorageAccount: CloudStorageAccountEntity): CloudStorageAccountDTO {
    const cloudStorageAccountDTO: CloudStorageAccountDTO = {
      cloudStorageId: cloudStorageAccount._id,
      email: cloudStorageAccount.email,
      key: cloudStorageAccount.key
    }

    return cloudStorageAccountDTO
  }
}
