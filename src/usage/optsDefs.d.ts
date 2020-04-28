import {Opt}  from '..'
import {Style} from '../style'

export const optsDefs:                                   (opt?: Opt) => (style?: Style) => string
export const optsDefsFrom: (id1: string, id2: string) => (opt?: Opt) => (style?: Style) => string