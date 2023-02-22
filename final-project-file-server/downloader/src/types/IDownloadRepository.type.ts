import { DownloadDTO } from '../dto/download.dto'

export interface IDownloadRepository {
  createDownload: (download: DownloadDTO) => Promise<DownloadDTO>
  readDownloads: () => Promise<DownloadDTO[]>
  readTodayDownloadsByStoredFileId: (storedFileId: string) => Promise<DownloadDTO[]>
  readAllDownloadsByStoredFileId: (storedFileId: string) => Promise<DownloadDTO[]>
  readDownloadById: (downloadId: string) => Promise<DownloadDTO>
}
