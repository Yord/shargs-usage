import {Opt}  from '..'
import {Style} from '../style'

export const optsList:                                  (opt?: Opt) => (style?: Style) => string
export const optsListWith: (options?: {id?: string}) => (opt?: Opt) => (style?: Style) => string