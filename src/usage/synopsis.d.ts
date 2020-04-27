import {Opt}  from '..'
import {Style} from '../style'

export const synopsis:                     (opts?: Opt) => (style?: Style) => string
export const synopsisFrom: (id: string) => (opts?: Opt) => (style?: Style) => string