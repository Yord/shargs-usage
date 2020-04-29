import {Style} from '../style'

export const table:                                  (rows?: string[][]) => (style?: Style) => string
export const tableWith: (options?: {id?: string}) => (rows?: string[][]) => (style?: Style) => string