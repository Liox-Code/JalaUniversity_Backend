import Piece from './piece'
import Position from './position'

export default class King extends Piece {
  canMoveTo (position: Position): boolean {
    const sameFile: boolean = position.getFile() === this.position.getFile()
    const ifFileOneSpace: boolean = Math.abs(position.getFile() - this.position.getFile()) === 1
    const sameRank: boolean = position.getRank() === this.position.getRank()
    const ifRankOneSpace: boolean = Math.abs(position.getRank() - this.position.getRank()) === 1

    if (ifRankOneSpace && sameFile) {
      return true
    }

    if (ifFileOneSpace && sameRank) {
      return true
    }

    if (ifFileOneSpace && ifRankOneSpace) {
      return true
    }

    return false
  }
}
