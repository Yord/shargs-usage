import {Opt}   from '..'
import {Style} from '../style'

export const optsLists:                     (opts?: Opt[]) => (style?: Style) => string
export const optsListsFrom: (id: string) => (opts?: Opt[]) => (style?: Style) => string