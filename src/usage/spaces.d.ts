import {Opt}   from '..'
import {Style} from '../style'

export const spaces:                     (length?: number) => (opts?: Opt[]) => (style?: Style) => string
export const spacesFrom: (id: string) => (length?: number) => (opts?: Opt[]) => (style?: Style) => string