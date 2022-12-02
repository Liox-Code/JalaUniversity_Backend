import Piece from './piece'
import Position from './position'

export default class Bishop extends Piece {
  canMoveTo (position: Position): boolean {
    if (position.getFile() === this.position.getFile() && position.getRank() === this.position.getRank()) {
      return false
    }

    if (Math.abs(position.getFile() - this.position.getFile()) === Math.abs(position.getRank() - this.position.getRank())) {
      return true
    }

    return false
  }
}
