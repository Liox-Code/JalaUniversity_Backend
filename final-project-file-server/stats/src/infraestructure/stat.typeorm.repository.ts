import { IStatRepository } from '../core/repositories/IStat.repository'

export class StatsTypeOrmRepository implements IStatRepository {
  async createStats () {
    console.log('create Stats')
  }

  async readStats () {
    console.log('read Stats')
  }

  async updateStats () {
    console.log('update Stats')
  }

  async eraseStats () {
    console.log('erase Stats')
  }
}
