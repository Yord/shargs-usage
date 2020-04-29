export {br, brWith}               from './layout/br'
export {cols, colsWith}           from './layout/cols'
export {decorate}                 from './combinators/decorate'
export {defs, defsWith}           from './layout/defs'
export {desc, descWith}           from './usage/desc'
export {justArgs}                 from './usage/decorators/justArgs'
export {layout}                   from './layout/combinators/layout'
export {layoutMap}                from './layout/combinators/layoutMap'
export {line, lineWith}           from './layout/line'
export {lines, linesWith}         from './layout/lines'
export {noCommands}               from './usage/decorators/noCommands'
export {note, noteWith}           from './usage/note'
export {notes, notesWith}         from './usage/notes'
export {onlyCommands}             from './usage/decorators/onlyCommands'
export {onlyFirstArg}             from './usage/decorators/onlyFirstArg'
export {optsFilter}               from './usage/decorators/optsFilter'
export {optsDef, optsDefWith}     from './usage/optsDef'
export {optsDefs, optsDefsWith}   from './usage/optsDefs'
export {optsList, optsListWith}   from './usage/optsList'
export {optsLists, optsListsWith} from './usage/optsLists'
export {optsMap}                  from './usage/decorators/optsMap'
export {pad}                      from './layout/decorators/pad'
export {space, spaceWith}         from './usage/space'
export {spaces, spacesWith}       from './usage/spaces'
export {stylePath}                from './layout/decorators/stylePath'
export {synopses, synopsesWith}   from './usage/synopses'
export {synopsis, synopsisWith}   from './usage/synopsis'
export {table, tableWith}         from './layout/table'
export {text, textWith}           from './layout/text'
export {texts, textsWith}         from './layout/texts'
export {usage}                    from './usage/combinators/usage'
export {usageMap}                 from './usage/combinators/usageMap'

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