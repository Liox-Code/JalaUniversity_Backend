import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class BoardDataEntity {
  @PrimaryColumn()
    boardId!: number

  @Column()
    boardHeight!: number

  @Column()
    boardWidth!: number
}
