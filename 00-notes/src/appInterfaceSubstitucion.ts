import { Log } from './interfaceSubstitutionPrinciple/log'
import { User } from './interfaceSubstitutionPrinciple/user'

const usuario = new User()
usuario.Get()
usuario.Insert()
usuario.Update()
usuario.Delete()

const log = new Log()
log.Get()
log.Insert()
