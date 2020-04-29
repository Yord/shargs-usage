import {Style} from '../style'

export const cols:                       (columns?: string[][]) => (style?: Style) => string
export const colsWith: ({id: string}) => (columns?: string[][]) => (style?: Style) => string