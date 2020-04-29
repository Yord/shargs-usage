import {Opt}  from '..'
import {Style} from '../style'

export const desc:                       (opt?: Opt) => (style?: Style) => string
export const descWith: ({id: string}) => (opt?: Opt) => (style?: Style) => string