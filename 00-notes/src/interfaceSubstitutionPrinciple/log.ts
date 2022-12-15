import { LogRepository } from './logRepository'

export class Log implements LogRepository {
  Insert () {
    console.log('Log Insert')
  }

  Get () {
    console.log('Log Get')
  }
}
