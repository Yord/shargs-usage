import {Opt}  from '..'
import {Style} from '../style'

export const optsDef:                                                (opt?: Opt) => (style?: Style) => string
export const optsDefWith: (options?: {id?: string, num?: number}) => (opt?: Opt) => (style?: Style) => string