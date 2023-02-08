import { CloudStorageAccountDTO } from '../dto/cloudStorageAccount.dto'

export interface ICloudStorageAccountRepository {
  createCloudStorageAccount: (cloudStorageAccount: CloudStorageAccountDTO) => Promise<CloudStorageAccountDTO>
  readCloudStorageAccount: (cloudStorageAccountId: string) => Promise<CloudStorageAccountDTO>
  updateCloudStorageAccount: (cloudStorageAccount: CloudStorageAccountDTO) => Promise<boolean>
  deleteCloudStorageAccount: (cloudStorageAccountId: string) => Promise<boolean>
}
