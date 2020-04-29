import {Style} from '../style'

export const texts:                                  (strings?: string[]) => (style?: Style) => string
export const textsWith: (options?: {id?: string}) => (strings?: string[]) => (style?: Style) => string