import {Opt}  from '..'
import {Style} from '../style'

export const notes:                     (strings?: string[]) => (opts?: Opt) => (style?: Style) => string
export const notesFrom: (id: string) => (strings?: string[]) => (opts?: Opt) => (style?: Style) => string