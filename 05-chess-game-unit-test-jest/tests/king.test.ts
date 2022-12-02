import King from '../src/king'
import Position from '../src/position'

let king: King
beforeEach(() => {
  king = new King('WHITE', 'E', 1)
})

it('Should move one place fordward', () => {
  const position = new Position('E', 2)
  expect(king.canMoveTo(position)).toBe(true)
})

it('Should not move to the same place', () => {
  const position = new Position('E', 1)
  expect(king.canMoveTo(position)).toBe(false)
})

it('Should move one place to the left', () => {
  const position = new Position('D', 1)
  expect(king.canMoveTo(position)).toBe(true)
})

it('Should not move fordward more than 1 space', () => {
  const position = new Position('E', 3)
  expect(king.canMoveTo(position)).toBe(false)
})

it('Should move one space diagonally', () => {
  const position = new Position('F', 2)
  expect(king.canMoveTo(position)).toBe(true)
})
