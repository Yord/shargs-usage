import {Style} from '../style'

export const cols:                                  (columns?: string[][]) => (style?: Style) => string
export const colsWith: (options?: {id?: string}) => (columns?: string[][]) => (style?: Style) => string