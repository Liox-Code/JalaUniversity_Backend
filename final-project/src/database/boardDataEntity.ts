import { Column, PrimaryColumn, Entity } from 'typeorm'

@Entity()
export default class BoardDataEntity {
  @PrimaryColumn()
    boardId!: number

  @Column()
    boardSize!: number
}
