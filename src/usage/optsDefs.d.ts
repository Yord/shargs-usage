import {Opts}  from '..'
import {Style} from '../style'

export const optsDefs:                                   (opts?: Opts) => (style?: Style) => string
export const optsDefsFrom: (id1: string, id2: string) => (opts?: Opts) => (style?: Style) => string