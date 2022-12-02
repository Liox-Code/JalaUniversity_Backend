import { File, Rank } from './types'

export default class Position {
  constructor (private file: File, private rank: Rank) {
    this.file = file
    this.rank = rank
  }

  getFile () {
    type TFileToNumber = {[key:string]:number}
    const fileToNumber:TFileToNumber = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8
    }
    return fileToNumber[this.file]
  }

  getRank () { return this.rank }
}
