import {Opt}  from '..'
import {Style} from '../style'

export const space:                                                (opt?: Opt) => (style?: Style) => string
export const spaceWith: (options?: {id?: string, num?: number}) => (opt?: Opt) => (style?: Style) => string