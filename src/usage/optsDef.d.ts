import {Opt}  from '..'
import {Style} from '../style'

export const optsDef:                                     (opt?: Opt) => (style?: Style) => string
export const optsDefWith: ({id1: string, id2: string}) => (opt?: Opt) => (style?: Style) => string