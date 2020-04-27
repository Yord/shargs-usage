import {Opts}  from '..'
import {Style} from '../style'

export const optsList:                     (opts?: Opts) => (style?: Style) => string
export const optsListFrom: (id: string) => (opts?: Opts) => (style?: Style) => string