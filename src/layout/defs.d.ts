import {Style} from '../style'

export const defs:                                   (tuples?: string[][]) => (style?: Style) => string
export const defsFrom: (id1: string, id2: string) => (tuples?: string[][]) => (style?: Style) => string