import { injectable } from 'inversify'
import BoardDataEntity from '../database/boardDataEntity'
import { BoardEntity } from '../entities/board.entity'
import { IBoardRepository } from '../repositories/IBoard.repository'
import { Repository } from 'typeorm'
import 'reflect-metadata'
import { AppDataSource } from '../database/dataSource'
import { BoardMapper } from '../database/boardMapper'
import { IPosition } from '../interfaces/IPosition'

@injectable()
export class BoardTypeOrmRepository implements IBoardRepository {
  private readonly repository: Repository<BoardDataEntity>

  constructor () {
    this.repository = AppDataSource.getRepository(BoardDataEntity)
  }

  async initialDB () {
    await AppDataSource.initialize()
  }

  async createBoard (board: BoardEntity): Promise<BoardEntity> {
    const data = await this.repository.save(BoardMapper.toDataEntity(board))
    return BoardMapper.toEntity(data)
  }

  async readBoard (id: number): Promise<BoardEntity> {
    const data = await this.repository.findOneBy({ boardId: id })
    return BoardMapper.toEntity(data)
  }

  async updateBoard (board: BoardEntity): Promise<BoardEntity> {
    const data = await this.repository.save(BoardMapper.toDataEntity(board))
    return BoardMapper.toEntity(data)
  }

  async randomPosition (limits: number): Promise<IPosition> {
    const random = (limits: number) => {
      let seed = Date.now()
      const A = 11
      const C = 12
      const M = limits

      seed = (seed * A + C) % M
      return seed
    }

    return { x: await random(limits), y: await random(limits) }
  }
}
