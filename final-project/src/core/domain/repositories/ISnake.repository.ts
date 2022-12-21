import { SnakeAggregate } from '../aggregates/snake.aggregate'

export interface ISnakeRepository {
  createSnake: (snake: SnakeAggregate) => Promise<void>
  readSnake: (id: number) => Promise<SnakeAggregate>
  updateSnake: (snake: SnakeAggregate) => Promise<void>
}
