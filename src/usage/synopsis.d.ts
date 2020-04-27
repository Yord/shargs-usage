import {Opts}  from '..'
import {Style} from '../style'

export const synopsis:                     (programName?: string) => (opts?: Opts) => (style?: Style) => string
export const synopsisFrom: (id: string) => (programName?: string) => (opts?: Opts) => (style?: Style) => string