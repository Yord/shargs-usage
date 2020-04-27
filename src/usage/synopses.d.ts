import {Opts}  from '..'
import {Style} from '../style'

export const synopses:                     (programName?: string) => (opts?: Opts) => (style?: Style) => string
export const synopsesFrom: (id: string) => (programName?: string) => (opts?: Opts) => (style?: Style) => string