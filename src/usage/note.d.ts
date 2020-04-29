import {Opt}  from '..'
import {Style} from '../style'

export const note:                       (string?: string) => (opt?: Opt) => (style?: Style) => string
export const noteWith: ({id: string}) => (string?: string) => (opt?: Opt) => (style?: Style) => string