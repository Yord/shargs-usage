import {Opt}  from '..'
import {Style} from '../style'

export const desc:                     (opts?: Opt) => (style?: Style) => string
export const descFrom: (id: string) => (opts?: Opt) => (style?: Style) => string