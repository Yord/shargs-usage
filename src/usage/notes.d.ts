import {Opt}  from '..'
import {Style} from '../style'

export const notes:                       (strings?: string[]) => (opt?: Opt) => (style?: Style) => string
export const notesWith: ({id: string}) => (strings?: string[]) => (opt?: Opt) => (style?: Style) => string