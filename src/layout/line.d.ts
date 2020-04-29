import {Style} from '../style'

export const line:                       (string?: string) => (style?: Style) => string
export const lineWith: ({id: string}) => (string?: string) => (style?: Style) => string