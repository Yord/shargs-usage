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
export {noCommands}               from './usage/decorators/noCommands'
export {note, noteFrom}           from './usage/note'
export {notes, notesFrom}         from './usage/notes'
export {onlyCommands}             from './usage/decorators/onlyCommands'
export {onlyFirstArg}             from './usage/decorators/onlyFirstArg'
export {optsFilter}               from './usage/decorators/optsFilter'
export {optsDef, optsDefFrom}     from './usage/optsDef'
export {optsDefs, optsDefsFrom}   from './usage/optsDefs'
export {optsList, optsListFrom}   from './usage/optsList'
export {optsLists, optsListsFrom} from './usage/optsLists'
export {optsMap}                  from './usage/decorators/optsMap'
export {pad}                      from './layout/decorators/pad'
export {space, spaceFrom}         from './usage/space'
export {spaces, spacesFrom}       from './usage/spaces'
export {stylePath}                from './layout/decorators/stylePath'
export {synopses, synopsesFrom}   from './usage/synopses'
export {synopsis, synopsisFrom}   from './usage/synopsis'
export {table, tableFrom}         from './layout/table'
export {text, textFrom}           from './layout/text'
export {texts, textsFrom}         from './layout/texts'
export {usage}                    from './usage/combinators/usage'

export interface Opt {
  args?: string[]
  contradicts?: string[],
  defaultValues?: any
  desc?: string
  descArg?: string
  implies?: string[]
  key?: string
  only?: any[]
  opts?: Opt[]
  required?: boolean
  reverse?: boolean
  rules?: (opt?: Opt) => (opts?: Opt[]) => boolean
  types?: string[]
  values?: any[]
  [key: string]: any
}