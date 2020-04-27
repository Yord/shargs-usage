import {Opts}  from '..'
import {Style} from '../style'

export const note:                     (string?: string) => (opts?: Opts) => (style?: Style) => string
export const noteFrom: (id: string) => (string?: string) => (opts?: Opts) => (style?: Style) => string