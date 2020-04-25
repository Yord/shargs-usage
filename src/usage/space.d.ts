import {Opt}   from '..'
import {Style} from '../style'

export const space:                      (opts?: Opt[]) => (style?: Style) => string
export const spaceFrom: (id?: string) => (opts?: Opt[]) => (style?: Style) => string