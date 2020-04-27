import {Opt}  from '..'
import {Style} from '../style'

export const optsDefs:                                   (opts?: Opt) => (style?: Style) => string
export const optsDefsFrom: (id1: string, id2: string) => (opts?: Opt) => (style?: Style) => string