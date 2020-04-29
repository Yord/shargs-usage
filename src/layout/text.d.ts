import {Style} from '../style'

export const text:                                  (string?: string) => (style?: Style) => string
export const textWith: (options?: {id?: string}) => (string?: string) => (style?: Style) => string