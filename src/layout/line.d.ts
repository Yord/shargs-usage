import {Style} from '../style'

export const line:                                  (string?: string) => (style?: Style) => string
export const lineWith: (options?: {id?: string}) => (string?: string) => (style?: Style) => string