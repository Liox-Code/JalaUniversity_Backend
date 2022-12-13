export class BoardEntity {
  boardId: number
  boardWidth: number
  boardHeight: number

  constructor (boardId: number, boardWidth: number, boardHeight: number) {
    this.boardId = boardId
    this.boardWidth = boardWidth
    this.boardHeight = boardHeight
  }
}
