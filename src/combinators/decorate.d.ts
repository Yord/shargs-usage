import {Opt}  from '..'
import {Style} from '../style'

export const decorate: ((...decorators: ((func: (opts?: Opt) => (style?: Style) => string) => (opts?: Opt) => (style?: Style) => string)[]) => (func: (opts?: Opt) => (style?: Style) => string) => (opts?: Opt) => (style?: Style) => string) &
                       ((...decorators: ((func:                 (style?: Style) => string) =>                 (style?: Style) => string)[]) => (func:                 (style?: Style) => string) =>                 (style?: Style) => string)