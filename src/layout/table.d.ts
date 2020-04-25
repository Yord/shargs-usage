import {Style} from '../style'

export const table:                     (rows?: string[][]) => (style?: Style) => string
export const tableFrom: (id: string) => (rows?: string[][]) => (style?: Style) => string