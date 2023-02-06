import { StatsTypeOrmRepository } from '../../infraestructure/stat.typeorm.repository'
import { IStatRepository } from '../repositories/IStat.repository'

export class StatService {
  private stat: IStatRepository

  constructor () {
    this.stat = new StatsTypeOrmRepository()
  }

  createStat () {
    console.log('create stat')
  }

  readStat () {
    console.log('read stat')
  }

  updateStat () {
    console.log('update stat')
  }

  eraseStat () {
    console.log('erase stat')
  }
}
