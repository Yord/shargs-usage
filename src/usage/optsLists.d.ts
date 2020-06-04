import {Opt}  from '..'
import {Style} from '../style'

export const optsLists:                                                (opt?: Opt) => (style?: Style) => string
export const optsListsWith: (options?: {id?: string, pad?: number}) => (opt?: Opt) => (style?: Style) => string