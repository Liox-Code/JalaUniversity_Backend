import { injectable } from 'inversify'
import BoardDataEntity from '../database/boardDataEntity'
import { BoardEntity } from '../core/domain/entities/board.entity'
import { IBoardRepository } from '../core/domain/repositories/IBoard.repository'
import { FindManyOptions, Repository } from 'typeorm'
import 'reflect-metadata'
import { AppDataSource } from '../database/dataSource'
import { BoardMapper } from '../database/boardMapper'

@injectable()
export class BoardTypeOrmRepository implements IBoardRepository {
  private readonly repository: Repository<BoardDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(BoardDataEntity)
  }

  async createBoard (board: BoardEntity): Promise<BoardEntity> {
    const data = await this.repository.save(BoardMapper.toDataEntity(board))
    return BoardMapper.toEntity(data)
  }

  async readBoard (id: number): Promise<BoardEntity> {
    const foundBoard = await this.repository.findOneBy({ boardId: id })
    if (!foundBoard) {
      throw new Error(`Board with id ${id} not found`)
    }
    return BoardMapper.toEntity(foundBoard)
  }

  async updateBoard (board: BoardEntity): Promise<BoardEntity> {
    const data = await this.repository.save(BoardMapper.toDataEntity(board))
    return BoardMapper.toEntity(data)
  }

  async eraseBoard (boardId: number): Promise<void> {
    const options: FindManyOptions<BoardDataEntity> = {
      where: { boardId }
    }
    const boardDataBodyArray = await this.repository.find(options)
    await this.repository.remove(boardDataBodyArray)
  }
}
