import { injectable } from 'inversify'
import { IPosition } from '../interfaces/IPosition'

@injectable()
export class RandomGeneratorService {
  generateRandomNumber (seed:number, multiplier:number, incrementer:number, limits: number) {
    const A = multiplier
    const C = incrementer
    const M = limits

    seed = (seed * A + C) % M
    return seed
  }

  generateRandomPosition (seed:number, limits: number): IPosition {
    const seedXDate = Date.now() * seed
    const posX = this.generateRandomNumber(seedXDate, 8, 7, limits)
    const posY = this.generateRandomNumber(seedXDate, 11, 12, limits)
    return { x: posX, y: posY }
  }
}
