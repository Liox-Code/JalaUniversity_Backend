export default class Rectangle {
  constructor (public length: number, public width: number) {
    this.length = length
    this.width = width
  }

  calculateArea ():number {
    return this.width * this.length
  }
}
