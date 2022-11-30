// Overloading

class Reservation {
  private from:Date
  private toOrDestination:Date | string
  private destination?:string

  constructor (from:Date, toOrDestination:Date | string) {
    this.from = from
    this.toOrDestination = toOrDestination
  }

  setDestination (destination: string) {
    this.destination = destination
  }
}

type Reserve = {
  (from:Date, to:Date, destination:string): Reservation
  (from:Date, destination:string): Reservation
}

const reserve: Reserve = (from:Date, toOrDestination:Date | string, destination?:string) => {
  const instance = new Reservation(from, toOrDestination)
  if (typeof destination === 'string') {
    instance.setDestination(destination)
  }
  return instance
}

const dateFrom = new Date('2020-01-23')
const dateTo = new Date('2022-10-03')

const AOverload = reserve(dateFrom, 'Argentina')
const BOverload = reserve(dateFrom, dateTo, 'Bolivia')

console.log(AOverload)
console.log(BOverload)
