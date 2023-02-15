import { StoreFileDTO } from '../dto/storeFile.dto'

export type TAPICredentials = {
  credentialClientID: string
  credentialSecret: string
  credentialRedirecrUri: string
  credentialRefreshToken: string
}

export interface IStoredFile {
  createStoreFile: (storeFile: StoreFileDTO) => Promise<StoreFileDTO>
}
