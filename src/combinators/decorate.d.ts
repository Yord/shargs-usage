import {Opt}  from '..'
import {Style} from '../style'

export const decorate: ((...decorators: ((func: (opt?: Opt) => (style?: Style) => string) => (opt?: Opt) => (style?: Style) => string)[]) => (func: (opt?: Opt) => (style?: Style) => string) => (opt?: Opt) => (style?: Style) => string) &
                       ((...decorators: ((func:                (style?: Style) => string) =>                (style?: Style) => string)[]) => (func:                (style?: Style) => string) =>                (style?: Style) => string)