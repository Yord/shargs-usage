import {Opt}  from '..'
import {Style} from '../style'

export const synopses:                       (opt?: Opt) => (style?: Style) => string
export const synopsesWith: ({id: string}) => (opt?: Opt) => (style?: Style) => string