import {Opt}   from '..'
import {Style} from '../style'

export const synopsis:                      (programName?: string) => (opts?: Opt[]) => (style?: Style) => string
export const synopsisFrom: (id?: string) => (programName?: string) => (opts?: Opt[]) => (style?: Style) => string