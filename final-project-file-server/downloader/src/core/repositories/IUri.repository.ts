export interface IUriRepository {
  createUri: () => Promise<void>
  readUri: () => Promise<void>
  updateUri: () => Promise<void>
  eraseUri: () => Promise<void>
}
