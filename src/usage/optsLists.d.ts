import {Opts}  from '..'
import {Style} from '../style'

export const optsLists:                     (opts?: Opts) => (style?: Style) => string
export const optsListsFrom: (id: string) => (opts?: Opts) => (style?: Style) => string