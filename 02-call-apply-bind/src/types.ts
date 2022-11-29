(() => { // any
// const a:any = 123
// console.log(a)

  // unknown
  // const a: unknown = 30
  // const b = a === 30
  // RESULT b = true

  // const c = a + 10
  // Operator '+' cannot be applied to types 'unknown' and '10'
  // if (typeof a === 'number') {
  //   let d = a + 10
  // }

  // boolean ************************************************************************************************************************************************************************************
  // let a = true
  // const b = true

  // let d: boolean = true

  // let e: true
  // e = false // Type 'false' is not assignable to type 'true'.

  // number ************************************************************************************************************************************************************************************
  // limite de number es 2**53
  // let a = 132
  // let b = Infinity * 0.1
  // const c = 456
  // let d = a < b

  // let e: number = 100
  // let f: 3.14 = 3.14
  // let g: 3 = 2

  // let oneMillion = 1_000_000
  // let twoMillion:2_000_000 = 2000000

  // bigint ************************************************************************************************************************************************************************************
  // let a = 2n ** 53n + 10n
  // const b = 4564n
  // var c = a + b

  // let d = 456.5n //A bigint literal must be an integer.
  // let e: bigint = 100 //Type 'number' is not assignable to type 'bigint'.

  // string ************************************************************************************************************************************************************************************
  // let a  = 'test'
  // var b = 'test2'
  // const c = 'test' // type literal test

  // let d = a + b + c
  // let e: string = 'zoom'
  // let e: jhon = 'jhon'

  // symbol ************************************************************************************************************************************************************************************
  // symbol solo es igual asi mismo
  // let a = Symbol('a')
  //  a = Symbol('aa')
  // let b: symbol = Symbol('b')
  // var c = a === b
  // let d = a + 'x' //The '+' operator cannot be applied to type 'symbol'.
  // const e = Symbol('e')
  // unique symbol no se puede asignar otro valor
  // unique symbol no se puede comparar con otro unique symbol
  // const f:unique symbol = Symbol('f') //nunca se podra cambiar el valor del symbpl
  // let f:unique symbol = Symbol('f') //A variable whose type is a 'unique symbol' type must be 'const'.-

  // object ************************************************************************************************************************************************************************************
  // let a:object = {
  //   b: 'x'
  // }

  // a.b //Property 'b' does not exist on type 'object'.

  // let b = {
  //   c: {
  //     d: 'f'
  //   }
  // }

  // b.c.d

  // let c: {b:number} = {
  //   b: 12
  // }

  // Primera class ************************************************************************************************************************************************************************************

  // let c: {
  //   firsName: string
  //   lastName: string
  // } = {
  //   firsName: 'john',
  //   lastName: 'perez'
  // }

  // class Person {
  //   constructor (
  //     public firsName: string,
  //     public lastName: string
  //   ) {
  //     console.log(__filename)
  //     console.log(lastName)
  //   }
  // }

  // c = new Person('Juan', 'Perez')

  // console.log(c)

  // let person = new Person('Lu', 'Flores')
  // person = {
  //   firsName: 'john',
  //   lastName: 'perez'
  // }
  // console.log(person)

  // Avoid using undefined **************************************
  // let i: number
  // const j = i * 3
  // console.log(j)

  // Optional Types ************************************************************************************************************************************************************************************
  // const a:{
  //   b:number
  //   [property: number] : boolean // Puede ser opcional, uno o mas de uno
  //   c?: string
  // } = {
  //   b: 1,
  //   c: 'lol',
  //   1: true,
  //   3: true,
  //   54: true,
  //   23: true
  // }

  // console.log(a)

  // key pair value ************************************************************************************************************************************************************************************
  // const airPlaneAssignment: {
  //     [property: string] : string
  // } = {
  //   '1DS': 'Bob',
  //   '2DS': 'Bob',
  //   '3DS': 'Bob'
  // }

  // Alias ************************************************************************************************************************************************************************************
  // Type aliases give a type a new name
  // type Age = number

  // type Person = {
  //   name: string
  //   age: Age
  // }

  // const personAge: Age = 12

  // const person:Person = {
  //   name: 'Bob',
  //   age: personAge
  // }

  // console.log(person)

  // No se puede tener el mismo nombre de alias en el mismo Scope pero si en diferentes

  // type Color = 'red'
  // const x = Math.random() < 0.5

  // if (x) {
  //   type Color = 'blue'
  //   const b: Color = 'blue'
  //   console.log(b)
  // } else {
  //   const b: Color = 'red'
  //   console.log(b)
  // }

  // // Type - Union and intersection types ************************************************************************************************************************************************************************************
  // type Cat = { name: string, purrs: boolean }
  // type Dog = { name: string, barks: boolean, wags: boolean }
  // type CatOrDogOrBoth = Cat | Dog
  // type CatAndDog = Cat & Dog

  // // Cat
  // const catDog01: CatOrDogOrBoth = { name: 'firulais', purrs: true }
  // console.log(catDog01)
  // // Cat
  // const catDog02: CatOrDogOrBoth = { name: 'firulais', barks: true, wags: true }
  // console.log(catDog02)
  // // Both
  // const catDog03: CatOrDogOrBoth = { name: 'firulais', purrs: true, barks: true, wags: true }
  // console.log(catDog03)

  // // Both
  // const catAndDog: CatAndDog = { name: 'firulais', purrs: true, barks: true, wags: true }
  // console.log(catAndDog)

  // type Return = string | null

  // function trueOrNull (isTrue: boolean): Return {
  //   if (isTrue) {
  //     return 'true'
  //   } else {
  //     return null
  //   }
  // }

  // const testTrue = trueOrNull(true)
  // console.log(testTrue)
  // const testFalse = trueOrNull(false)
  // console.log(testFalse)

  // Array ************************************************************************************************************************************************************************************
  // Const prohibe reasignacion es diferente a read-only que prohibe modificar
  // const e = [1, 'test']
  // e.push('add')
  // console.log(e)

  // const f = []
  // f.push(1)
  // f.push('asd')
  // f.push(true)
  // console.log(typeof f)

  // const n: number[] = []
  // n.push(1)
  // n.push('asd') //Argument of type 'string' is not assignable to parameter of type 'number'.

  // The general rule of thumb is to keep arrays homogeneous. That is, do not mix apples and oranges and numbers in a single array
  // const e = [1, 'test']
  // const result = e.map(item => {
  //   if (typeof item === 'number') {
  //     return ++item
  //   }
  //   return item.toUpperCase()
  // })

  // // console.log(result)

  // function buildArray () {
  //   const a = []
  //   a.push(1)
  //   a.push('test')
  //   return a
  // }

  // const myArray = buildArray()
  // myArray.push(true)

  // Tuplas ************************************************************************************************************************************************************************************
  // const a: [number] = [1]
  // console.log(a)

  // const b: [string, string, number] = ['lol', 'lol', 1]
  // console.log(b)

  // let c: [string, string, number?, number?] = ['lol', 'lol']
  // c = ['lol', 'lol', 1]
  // c = ['lol', 'lol', 1, 2]
  // console.log(c)

  // const trainFares : [number, number?][] = [[2], [2], [2, 2], [2, 2], [2, 2], [2, 2]]
  // console.log(trainFares)

  // const moreTrainFares: ([number] | [number, number])[] = [[2], [2], [2, 2], [2, 2], [2, 2], [2, 2]]
  // console.log(moreTrainFares)

  // Read-only ************************************************************************************************************************************************************************************

  // const a: readonly number[] = [1, 2, 3]
  // // a.push(4) // Property 'push' does not exist on type 'readonly number[]

  // const b : readonly number[] = a.concat(4)
  // const value = b[3]

  // // b[0] = 9 //Index signature in type 'readonly number[]' only permits reading.

  // // b = []

  // console.log(value)
  // console.log(b)

  // const c = b.concat(5)
  // c.push(6)
  // console.log(c)

  // const d = [...b]
  // d.push(6)
  // console.log(d)

  // type A = readonly string[]
  // type B = ReadonlyArray<string>
  // type C = Readonly<string[]>

  // type D = readonly [number, string]
  // type E = Readonly <[number, string]>

  // NULL, UNDEFINED, VOID, NEVER ************************************************************************************************************************************************************************************
  // Null Ausencia de valor

  // function a (x : number): (number | null) {
  //   if (x < 10) {
  //     return x
  //   } else {
  //     return null
  //   }
  // }
  // a(12)

  // Undefined No definio un valor aun

  // Void funcion no tiene return

  // Never no retorna nada por que no terminara nunca

  // function neverA () {
  //   throw TypeError('I always error')
  // }
  // neverA()
  // function neverB () {
  //   throw TypeError('I always error')
  // }
  // neverB()

  // ENUM ************************************************************************************************************************************************************************************
  // OBJETOS PARA ALMACENAR INFORMACION QUE NUNCA VA A CAMBIAR
  // Nombres y valores deben comenzar con Mayuscula por buenas practicas
  // An enum type is a special data type that enables for a variable to be a set of predefined constants. The variable must be equal to one of the values that have been predefined for it. Common examples include compass directions (values of NORTH, SOUTH, EAST, and WEST) and the days of the week.

  // enum Languaje01 {
  //   English = 0,
  //   Spanish = 1,
  //   Russian = 2
  // }

  // const myFirstLanguaje01 = Languaje01.English
  // const mySecondLanguaje01 = Languaje01["Spanish"]

  // enum Languaje02 {
  //   English = 0,
  //   Spanish = 1,
  // }

  // enum Languaje02 {
  //   Russian = 2 // Agregar a mano contador no lo infiere
  // }

  // const myFirstLanguaje02 = Languaje01.English
  // const mySecondLanguaje02 = Languaje01["Spanish"]

  // enum Languaje03 {
  //   English = 100,
  //   Spanish = 200,
  //   Russian
  // }

  // enum Color {
  //   Red = '#FF1010',
  //   Blue = '#1010ff',
  //   Pink = 0x1000,
  //   White = 100
  // }

  // const red = Color.Red
  // // const green = Color.Green //Property 'Green' does not exist on type 'typeof Color'
  // const blue = Color[1]
  // const green = Color[6]
  // console.log(typeof green)

  // const enum Color02 {
  //   Red = '#FF1010',
  //   Blue = '#1010ff',
  //   Pink = 0x1000,
  //   White = 100
  // }

  // const Color02 = Color02.Red
  // const Color02 = Color02[2] //A const enum member can only be accessed using a string literal.

// enum Flippable {
//   Burger,
//   Cup,
//   Table
// }

// function flip (f : Flippable) {
//   return 'flipped!'
// }

// flip(Flippable.Burger)
// flip(Flippable.Cup)
// flip(500)

// function greets01 (name : string) {
//   return name + 'hello'
// }

// const greets02 = function (name : string) {
//   return name + 'hello'
// }

// const greets03 = (name : string) => {
//   return name + 'hello'
// }

// const greets04 = new Function('name', 'return \'hello \', name')

// function log01 (message : string, userId?: string) {
//   const time = new Date().toLocaleTimeString
//   console.log(time, message, userId || 'not signed in')
// }

// log01('page loaded')
// log01('user signed in', 'asd')

// function log02 (message : string, userId?: string) {
//   const time = new Date().toLocaleTimeString
//   console.log(time, message, userId || 'not signed in')
// }

// log02('page loaded')
// log02('user signed in', 'asd')

// function sum (number: number[]): number {
//   return number.reduce((total, n) => total + n, 0
//   )
// }

// sum([1, 2, 3])

// function sum () {
//   return Array.from(arguments).reduce((total, n) => total + n, 0)
// }

// console.log(sum(1, 2, 3))

// Rest Parameters
// Envio no definido de numero parametros
// function sum (...args:number[]) {
//   return args.reduce((total, n) => total + n, 0)
// }

// console.log(sum(1, 2, 3))
// console.log(sum.apply(this, [1, 2, 3]))
// console.log(sum.call(this, 1, 2, 3))
// console.log(sum.bind(this, 1, 2, 3))

})()

// let x = {
//   a() {
//     return this
//   }
// }

// console.log(this)
// console.log(x.a())

// let a = x.a
// console.log(a())

// function fancyDate(this: Date){
//   console.log(`${this.getDate()} ${this.getMonth()} ${this.getFullYear()}`)
// }
// fancyDate.call(new Date())
// fancyDate()//The 'this' context of type 'void' is not assignable to method's 'this' of type 'Date'

// Generators ******************************************************

function* createNumbers ():IterableIterator<number> {
  let n = 0
  while(true) {
    yield n++
  }
}

let numbers = createNumbers()

console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())
