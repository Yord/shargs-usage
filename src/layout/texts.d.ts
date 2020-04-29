import {Style} from '../style'

export const texts:                       (strings?: string[]) => (style?: Style) => string
export const textsWith: ({id: string}) => (strings?: string[]) => (style?: Style) => string