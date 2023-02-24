import { IFileRepository } from '../types/IFileRepository.type'
import { FileRepository } from '../database/repositories/file.repository'
import { FileDTO } from '../dto/file.dto'
import { DownloadRepository } from '../database/repositories/download.repository'
import { StoredFileService } from '../services/storedFile.service'
import { DownloadDTO } from '../dto/download.dto'

export class FileService {
  private fileRepository: IFileRepository
  private storedFileService: StoredFileService
  private donwloadFileRepository: DownloadRepository

  constructor () {
    this.fileRepository = new FileRepository()
    this.storedFileService = new StoredFileService()
    this.donwloadFileRepository = new DownloadRepository()
  }

  createFile = async (file: FileDTO) => {
    return await this.fileRepository.createFile(file)
  }

  readFiles = async () => {
    return await this.fileRepository.readFiles()
  }

  readFileById = async (fileId: string) => {
    const file = await this.fileRepository.readFileById(fileId)

    const storedFileList = await this.storedFileService.readStoredFileByFileId(file.fileId)

    const allDownloads: DownloadDTO[] = []
    const allTodayDownloads: DownloadDTO[] = []

    for (const storedFile of storedFileList) {
      if (storedFile.id) {
        const foundTodayDownloads = await this.donwloadFileRepository.readTodayDownloadsByStoredFileId(storedFile.id)
        allTodayDownloads.push(...foundTodayDownloads)

        const foundDownloads = await this.donwloadFileRepository.readAllDownloadsByStoredFileId(storedFile.id)
        allDownloads.push(...foundDownloads)
      }
    }

    const numberDonwloads = allDownloads.length
    const numberTodayDonwloads = allTodayDownloads.length
    const mbDonwloadedToday = file.size * allTodayDownloads.length
    const mbDonwloadedTotal = file.size * allDownloads.length

    return {
      NumberDonwloads: numberDonwloads,
      NumberTodayDonwloads: numberTodayDonwloads,
      MBDonwloadedToday: mbDonwloadedToday,
      MBDonwloadedTotal: mbDonwloadedTotal
    }
  }

  updateFile = async (fileId: string, file: FileDTO) => {
    return await this.fileRepository.updateFile(fileId, file)
  }

  deleteFile = async (fileId: string) => {
    return await this.fileRepository.deleteFile(fileId)
  }
}