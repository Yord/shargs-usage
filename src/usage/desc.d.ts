import {Opt}  from '..'
import {Style} from '../style'

export const desc:                     (opt?: Opt) => (style?: Style) => string
export const descFrom: (id: string) => (opt?: Opt) => (style?: Style) => string