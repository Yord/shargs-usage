import {Opt}   from '..'
import {Style} from '../style'

export const note:                     (string?: string) => (opts?: Opt[]) => (style?: Style) => string
export const noteFrom: (id: string) => (string?: string) => (opts?: Opt[]) => (style?: Style) => string