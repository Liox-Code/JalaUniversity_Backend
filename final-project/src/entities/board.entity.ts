export class BoardEntity {
  boardId: number
  boardSize: number

  constructor (boardId: number, boardSize: number) {
    this.boardId = boardId
    this.boardSize = boardSize
  }
}
