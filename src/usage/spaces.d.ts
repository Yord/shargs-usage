import {Opt}  from '..'
import {Style} from '../style'

export const spaces:                     (num?: number) => (opt?: Opt) => (style?: Style) => string
export const spacesFrom: (id: string) => (num?: number) => (opt?: Opt) => (style?: Style) => string