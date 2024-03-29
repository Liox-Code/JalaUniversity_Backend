import { FileDTO } from '../dto/file.dto'
import { FileEntity } from '../database/entities/file.entity'
import { ObjectId } from 'mongodb'

export class FileMapper {
  static toEntity (file: FileDTO): FileEntity {
    const fileEntity: FileEntity = {
      _id: new ObjectId(file.id),
      fileId: new ObjectId(file.fileId),
      fileName: file.fileName,
      mimeType: file.mimeType,
      size: file.size,
      status: file.status
    }

    return fileEntity
  }

  static toDTO (file: FileEntity, content: Buffer): FileDTO {
    const fileDTO: FileDTO = {
      id: file._id?.toString(),
      fileId: file.fileId.toString(),
      fileName: file.fileName,
      mimeType: file.mimeType,
      size: file.size,
      status: file.status,
      content
    }

    return fileDTO
  }
}
