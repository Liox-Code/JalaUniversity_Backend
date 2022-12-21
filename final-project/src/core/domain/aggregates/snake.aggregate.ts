import { injectable } from 'inversify'
import { EDirection } from '../../../enums/EDirection'
import { SnakeHeadEntity } from '../entities/snakeHead.valueObject'
import { SnakeBodyEntity } from '../entities/snakeBody.valueObject'

@injectable()
export class SnakeAggregate {
  private _snakeId: number
  private _snakeSize: number
  private _snakeDirection: EDirection
  private _snakeHead: SnakeHeadEntity
  private _snakeBody: SnakeBodyEntity[]

  get snakeId (): number {
    return this._snakeId
  }

  get snakeSize (): number {
    return this._snakeSize
  }

  get snakeDirection (): EDirection {
    return this._snakeDirection
  }

  get snakeHead (): SnakeHeadEntity {
    return this._snakeHead
  }

  get snakeBody (): SnakeBodyEntity[] {
    return this._snakeBody
  }

  set snakeId (snakeId: number) {
    this._snakeId = snakeId
  }

  set snakeSize (snakeSize: number) {
    this._snakeSize = snakeSize
  }

  set snakeDirection (snakeDirection: EDirection) {
    this._snakeDirection = snakeDirection
  }

  set snakeHead (snakeHead: SnakeHeadEntity) {
    this._snakeHead = snakeHead
  }

  set snakeBody (snakeBody: SnakeBodyEntity[]) {
    this._snakeBody = snakeBody
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
