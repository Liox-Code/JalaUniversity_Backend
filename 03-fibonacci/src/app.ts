function * fibonacci ():IterableIterator<number> {
  let n1 = 0
  let n2 = 1
  let aux = 0
  while (true) {
    yield aux
    n1 = n2
    n2 = aux
    aux = n1 + n2
  }
}

const fibfunc = fibonacci()

console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
console.log(fibfunc.next())
