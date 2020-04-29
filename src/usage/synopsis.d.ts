import {Opt}  from '..'
import {Style} from '../style'

export const synopsis:                                  (opt?: Opt) => (style?: Style) => string
export const synopsisWith: (options?: {id?: string}) => (opt?: Opt) => (style?: Style) => string