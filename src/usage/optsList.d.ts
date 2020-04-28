import {Opt}  from '..'
import {Style} from '../style'

export const optsList:                     (opt?: Opt) => (style?: Style) => string
export const optsListFrom: (id: string) => (opt?: Opt) => (style?: Style) => string