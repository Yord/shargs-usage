import {Opts}  from '..'
import {Style} from '../style'

export const decorate: ((...decorators: ((func: (opts?: Opts) => (style?: Style) => string) => (opts?: Opts) => (style?: Style) => string)[]) => (func: (opts?: Opts) => (style?: Style) => string) => (opts?: Opts) => (style?: Style) => string) &
                       ((...decorators: ((func:                  (style?: Style) => string) =>                  (style?: Style) => string)[]) => (func:                  (style?: Style) => string) =>                  (style?: Style) => string)