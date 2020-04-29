import {Style} from '../style'

export const defs:                                                    (tuples?: string[][]) => (style?: Style) => string
export const defsWith: (options?: {id?: string, padding?: number}) => (tuples?: string[][]) => (style?: Style) => string