import { injectable } from 'inversify'
import BoardDataEntity from '../database/boardDataEntity'
import { BoardEntity } from '../core/domain/entities/board.entity'
import { IBoardRepository } from '../core/domain/repositories/IBoard.repository'
import { FindManyOptions, Repository } from 'typeorm'
import 'reflect-metadata'
import { AppDataSource } from '../database/dataSource'
import { BoardMapper } from '../database/boardMapper'
import { ObjectId } from 'mongodb'

@injectable()
export class BoardTypeOrmRepository implements IBoardRepository {
  private readonly repository: Repository<BoardDataEntity>

  constructor () {
    this.repository = AppDataSource.getMongoRepository(BoardDataEntity)
  }

  async createBoard (board: BoardEntity): Promise<BoardEntity> {
    const data = await this.repository.save(BoardMapper.toDataEntity(board))
    return BoardMapper.toEntity(data)
  }

  async readBoard (boardId: number): Promise<BoardEntity> {
    const objectId = new ObjectId(boardId)
    const foundBoard = await this.repository.findOneBy({ _id: objectId })
    if (!foundBoard) {
      throw new Error(`Board with id ${boardId} not found`)
    }
    return BoardMapper.toEntity(foundBoard)
  }

  async updateBoard (board: BoardEntity): Promise<BoardEntity> {
    const data = await this.repository.save(BoardMapper.toDataEntity(board))
    return BoardMapper.toEntity(data)
  }

  async eraseBoard (boardId: number): Promise<void> {
    const objectId = new ObjectId(boardId)
    const options: FindManyOptions<BoardDataEntity> = {
      where: { _id: objectId }
    }
    const boardDataBodyArray = await this.repository.find(options)
    await this.repository.remove(boardDataBodyArray)
  }
}
