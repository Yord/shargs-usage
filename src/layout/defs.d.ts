import {Style} from '../style'

export const defs:                                                (tuples?: string[][]) => (style?: Style) => string
export const defsWith: (options?: {id?: string, pad?: number}) => (tuples?: string[][]) => (style?: Style) => string