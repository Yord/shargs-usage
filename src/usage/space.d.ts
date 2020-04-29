import {Opt}  from '..'
import {Style} from '../style'

export const space:                       (opt?: Opt) => (style?: Style) => string
export const spaceWith: ({id: string}) => (opt?: Opt) => (style?: Style) => string