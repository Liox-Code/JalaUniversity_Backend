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

  randomPosition (limits: number): IPosition {
    const random = (seed:number, multiplier:number, incrementer:number, limits: number) => {
      const A = multiplier
      const C = incrementer
      const M = limits

      seed = (seed * A + C) % M
      return seed
    }

    const posX = random(Date.now(), 8, 7, limits)
    const posY = random(Date.now(), 11, 12, limits)

    return { x: posX, y: posY }
  }
}
