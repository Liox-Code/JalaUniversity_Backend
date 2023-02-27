import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'
import { CloudStorageAccountEntity } from '../database/entities/cloudStorageAccount.entity'
import { ObjectId } from 'mongodb'

export class CloudStorageAccountMapper {
  static toEntity (cloudStorageAccount: CloudStorageAccountDTO): CloudStorageAccountEntity {
    const cloudStorageAccountEntity: CloudStorageAccountEntity = {
      _id: new ObjectId(cloudStorageAccount.cloudStorageAccountId),
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
      cloudStorageAccountId: cloudStorageAccount._id.toString(),
      email: cloudStorageAccount.email,
      credentialClientID: cloudStorageAccount.credentialClientID,
      credentialRedirecrUri: cloudStorageAccount.credentialRedirecrUri,
      credentialRefreshToken: cloudStorageAccount.credentialRefreshToken,
      credentialSecret: cloudStorageAccount.credentialSecret
    }

    return cloudStorageAccountDTO
  }
}
