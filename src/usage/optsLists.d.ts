import {Opt}  from '..'
import {Style} from '../style'

export const optsLists:                       (opt?: Opt) => (style?: Style) => string
export const optsListsWith: ({id: string}) => (opt?: Opt) => (style?: Style) => string