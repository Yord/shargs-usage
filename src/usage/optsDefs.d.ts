import {Opt}  from '..'
import {Style} from '../style'

export const optsDefs:                                                    (opt?: Opt) => (style?: Style) => string
export const optsDefsWith: (options?: {id?: string, padding?: number}) => (opt?: Opt) => (style?: Style) => string