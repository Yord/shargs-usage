import {Opt}   from '..'
import {Style} from '../style'

export const optsDef:                                   (opts?: Opt[]) => (style?: Style) => string
export const optsDefFrom: (id1: string, id2: string) => (opts?: Opt[]) => (style?: Style) => string