export interface IStatRepository {
  createStats: () => Promise<void>
  readStats: () => Promise<void>
  updateStats: () => Promise<void>
  eraseStats: () => Promise<void>
}
