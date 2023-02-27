export interface FileUploder {
  id?: string
  fileId: string
  fileName: string
  mimeType: string
  size: number
  status: string
  content: Buffer
}

export interface CloudStorageAccountUploder {
  cloudStorageAccountId: string
  email: string
  credentialClientID: string
  credentialSecret: string
  credentialRedirecrUri: string
  credentialRefreshToken: string
}

export interface StoreFileUploder {
  cloudStorageAccountId: string
  fileId: string
  cloudFileId: string
  webViewLink: string
  webContentLink: string
}
