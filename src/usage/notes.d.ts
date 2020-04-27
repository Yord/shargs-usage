import {Opts}  from '..'
import {Style} from '../style'

export const notes:                     (strings?: string[]) => (opts?: Opts) => (style?: Style) => string
export const notesFrom: (id: string) => (strings?: string[]) => (opts?: Opts) => (style?: Style) => string