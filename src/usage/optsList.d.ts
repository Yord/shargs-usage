import {Opt}   from '..'
import {Style} from '../style'

export const optsList:                     (opts?: Opt[]) => (style?: Style) => string
export const optsListFrom: (id: string) => (opts?: Opt[]) => (style?: Style) => string