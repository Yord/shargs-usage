import {Style} from '../style'

export const text:                       (string?: string) => (style?: Style) => string
export const textWith: ({id: string}) => (string?: string) => (style?: Style) => string