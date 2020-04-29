import {Opt}  from '..'
import {Style} from '../style'

export const synopses:                                  (opt?: Opt) => (style?: Style) => string
export const synopsesWith: (options?: {id?: string}) => (opt?: Opt) => (style?: Style) => string