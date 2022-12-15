import { IDelete } from './delete'
import { IGet } from './get'
import { IInsert } from './insert'
import { IUpdate } from './update'

export interface UserRepository extends IInsert, IGet, IUpdate, IDelete {
}
