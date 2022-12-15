import Rectangle from './rectangle'

export default class Square extends Rectangle {
  constructor (public size: number) {
    super(size, size)
  }

  calculateArea ():number {
    return this.size * this.size
  }
}
