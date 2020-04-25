import {Opt}   from '..'
import {Style} from '../style'

export const synopses:                      (programName?: string) => (opts?: Opt[]) => (style?: Style) => string
export const synopsesFrom: (id?: string) => (programName?: string) => (opts?: Opt[]) => (style?: Style) => string