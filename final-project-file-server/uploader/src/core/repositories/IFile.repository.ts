export interface IFileRepository {
  createFile: () => Promise<void>
  readFile: () => Promise<void>
  updateFile: () => Promise<void>
  eraseFile: () => Promise<void>
}
