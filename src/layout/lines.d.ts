import {Style} from '../style'

export const lines:                                  (strings?: string[]) => (style?: Style) => string
export const linesWith: (options?: {id?: string}) => (strings?: string[]) => (style?: Style) => string