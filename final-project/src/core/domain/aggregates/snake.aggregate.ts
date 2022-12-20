import { injectable } from 'inversify'
import { EDirection } from '../../../enums/EDirection'
import { SnakeEntity } from '../entities/snake.entity'
import { SnakeBodyEntity } from '../entities/snakeBody.entity'

@injectable()
export class SnakeAggregate {
  private _snakeId: number
  private _snakeSize: number
  private _snakeDirection: EDirection
  private _snakeHead: SnakeEntity
  private _snakeBody: SnakeBodyEntity[]

  constructor (snakeId:number, snakeHead: SnakeEntity) {
    this._snakeId = snakeId
    this._snakeSize = 1
    this._snakeDirection = EDirection.UP
    this._snakeHead = snakeHead
    this._snakeBody = []
  }

  get snakeId (): number {
    return this._snakeId
  }

  get snakeBody (): SnakeBodyEntity[] {
    return this._snakeBody
  }

  addSnakeBody (snakeBody: SnakeBodyEntity): void {
    this._snakeBody.push(snakeBody)
  }

  async checkLenght (): Promise<void> {
    const snakeCalculatedSize = this.snakeBody.length + 1
    if (this._snakeSize === snakeCalculatedSize) {
      throw new Error('Snake Lenght and size incosistent')
    }
  }
}
