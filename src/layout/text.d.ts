import {Style} from '../style'

export const text:                     (string?: string) => (style?: Style) => string
export const textFrom: (id: string) => (string?: string) => (style?: Style) => string