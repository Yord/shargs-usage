import {Opts}  from '..'
import {Style} from '../style'

export const optsDef:                                   (opts?: Opts) => (style?: Style) => string
export const optsDefFrom: (id1: string, id2: string) => (opts?: Opts) => (style?: Style) => string