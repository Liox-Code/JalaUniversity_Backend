import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { CloudStorageAccountEntity } from '../database/entities/cloudStorageAccount.entity'

export class CloudStorageAccountMapper {
  static toEntity (cloudStorageAccount: CloudStorageAccountDTO): CloudStorageAccountEntity {
    const cloudStorageAccountEntity: CloudStorageAccountEntity = {
      email: cloudStorageAccount.email,
      credentialClientID: cloudStorageAccount.credentialClientID,
      credentialRedirecrUri: cloudStorageAccount.credentialRedirecrUri,
      credentialRefreshToken: cloudStorageAccount.credentialRefreshToken,
      credentialSecret: cloudStorageAccount.credentialSecret
    }

    return cloudStorageAccountEntity
  }

  static toDTO (cloudStorageAccount: CloudStorageAccountEntity): CloudStorageAccountDTO {
    const cloudStorageAccountDTO: CloudStorageAccountDTO = {
      email: cloudStorageAccount.email,
      credentialClientID: cloudStorageAccount.credentialClientID,
      credentialRedirecrUri: cloudStorageAccount.credentialRedirecrUri,
      credentialRefreshToken: cloudStorageAccount.credentialRefreshToken,
      credentialSecret: cloudStorageAccount.credentialSecret
    }

    return cloudStorageAccountDTO
  }
}
