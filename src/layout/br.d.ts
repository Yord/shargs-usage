import {Style} from '../style'

export const br:                                                  (style?: Style) => string
export const brWith: (options?: {id?: string, lines?: number}) => (style?: Style) => string