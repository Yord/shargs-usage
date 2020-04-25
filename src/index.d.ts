export {br, brFrom}               from './layout/br'
export {brs, brsFrom}             from './layout/brs'
export {cols, colsFrom}           from './layout/cols'
export {decorate}                 from './combinators/decorate'
export {defs, defsFrom}           from './layout/defs'
export {justArgs}                 from './usage/decorators/justArgs'
export {layout}                   from './layout/combinators/layout'
export {layoutMap}                from './layout/combinators/layoutMap'
export {line, lineFrom}           from './layout/line'
export {lines, linesFrom}         from './layout/lines'

export interface Opt {
  [key: string]: any
}