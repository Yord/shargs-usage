import {Opts}  from '..'
import {Style} from '../style'

export const space:                     (opts?: Opts) => (style?: Style) => string
export const spaceFrom: (id: string) => (opts?: Opts) => (style?: Style) => string