export type CloudStorageAccountType = {
  id: string;
  email: string;
  numberDownloads: number;
  totalSizeDownloads: number;
}

export type FileType = {
  id?: string | undefined;
  fileId: string;
  name: string;
  size: number;
  numberDownloads: number;
  totalSizeDownloads: number;
}
