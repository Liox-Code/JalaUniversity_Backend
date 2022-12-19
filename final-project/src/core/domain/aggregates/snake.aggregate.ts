import { injectable } from 'inversify'
import { SnakeHeadEntity } from '../entities/snakeHead.entity'
import { SnakeBodyEntity } from '../entities/snakeBody.entity'

@injectable()
export class Snake {
  private _snakeId: number
  private _snakeSize: number
  private _snakeHead: SnakeHeadEntity
  private _snakeBody: SnakeBodyEntity[]

  get snakeId (): number {
    return this._snakeId
  }

  constructor (snakeId:number, snakeHead: SnakeHeadEntity) {
    this._snakeId = snakeId
    this._snakeSize = 1
    this._snakeHead = snakeHead
    this._snakeBody = []
  }

  public addSnakeBody (snakeBody: SnakeBodyEntity): void {
    this._snakeBody.push(snakeBody)
  }

  public get snakeBody (): SnakeBodyEntity[] {
    return this._snakeBody
  }

  async checkLenght (): Promise<void> {
    const snakeCalculatedSize = this.snakeBody.length + 1
    if (this._snakeSize === snakeCalculatedSize) {
      throw new Error('Snake Lenght and size incosistent')
    }
  }
}
