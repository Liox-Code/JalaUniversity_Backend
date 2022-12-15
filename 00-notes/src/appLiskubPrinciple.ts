import Rectangle from './liskubPrinciple/rectangle'
import Square from './liskubPrinciple/square'

const rec: Rectangle = new Square(12)
console.log(rec.calculateArea())

function test (shape: Rectangle):void {
  shape.width = 5
  shape.length = 4

  if (shape.calculateArea() !== 20) {
    console.log('Bad Area')
  }
}

test(rec)
