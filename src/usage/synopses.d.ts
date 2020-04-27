import {Opt}  from '..'
import {Style} from '../style'

export const synopses:                     (opts?: Opt) => (style?: Style) => string
export const synopsesFrom: (id: string) => (opts?: Opt) => (style?: Style) => string