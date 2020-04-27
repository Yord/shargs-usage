import {Opts}  from '..'
import {Style} from '../style'

export const spaces:                     (length?: number) => (opts?: Opts) => (style?: Style) => string
export const spacesFrom: (id: string) => (length?: number) => (opts?: Opts) => (style?: Style) => string