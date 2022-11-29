(() => {
  // Call ****************************************************************************************************
  function isOdd (number: number): boolean {
    return !!((number % 2))
  }

  function getOddNumbers (...args: number[]) {
    return Array.prototype.filter.call(args, isOdd)
  }

  const result = getOddNumbers(10, 1, 3, 4, 8, 9)
  console.log(result)

  // Apply ****************************************************************************************************
  const arr = [1, 2, 3]
  const numbers = [4, 5, 6]

  arr.push.apply(arr, numbers)

  console.log(arr)

  // Bind ****************************************************************************************************
  const person = {
    name: 'John Doe',
    getName: function () {
      console.log(this.name)
    }
  }

  setTimeout(person.getName, 500)
  const f = person.getName.bind(person)
  setTimeout(f, 500)
})()
