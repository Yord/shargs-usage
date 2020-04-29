const {br, brWith}               = require('./layout/br')
const {cols, colsWith}           = require('./layout/cols')
const {decorate}                 = require('./combinators/decorate')
const {defs, defsWith}           = require('./layout/defs')
const {desc, descWith}           = require('./usage/desc')
const {justArgs}                 = require('./usage/decorators/justArgs')
const {layout}                   = require('./layout/combinators/layout')
const {layoutMap}                = require('./layout/combinators/layoutMap')
const {line, lineWith}           = require('./layout/line')
const {lines, linesWith}         = require('./layout/lines')
const {noCommands}               = require('./usage/decorators/noCommands')
const {note, noteWith}           = require('./usage/note')
const {notes, notesWith}         = require('./usage/notes')
const {onlyCommands}             = require('./usage/decorators/onlyCommands')
const {onlyFirstArg}             = require('./usage/decorators/onlyFirstArg')
const {optsFilter}               = require('./usage/decorators/optsFilter')
const {optsDef, optsDefWith}     = require('./usage/optsDef')
const {optsDefs, optsDefsWith}   = require('./usage/optsDefs')
const {optsList, optsListWith}   = require('./usage/optsList')
const {optsLists, optsListsWith} = require('./usage/optsLists')
const {optsMap}                  = require('./usage/decorators/optsMap')
const {pad}                      = require('./layout/decorators/pad')
const {space, spaceWith}         = require('./usage/space')
const {spaces, spacesWith}       = require('./usage/spaces')
const {stylePath}                = require('./layout/decorators/stylePath')
const {synopses, synopsesWith}   = require('./usage/synopses')
const {synopsis, synopsisWith}   = require('./usage/synopsis')
const {table, tableWith}         = require('./layout/table')
const {text, textWith}           = require('./layout/text')
const {texts, textsWith}         = require('./layout/texts')
const {usage}                    = require('./usage/combinators/usage')
const {usageMap}                 = require('./usage/combinators/usageMap')

module.exports = {
  br,
  brWith,
  cols,
  colsWith,
  decorate,
  defs,
  defsWith,
  desc,
  descWith,
  justArgs,
  layout,
  layoutMap,
  line,
  lineWith,
  lines,
  linesWith,
  noCommands,
  note,
  noteWith,
  notes,
  notesWith,
  onlyCommands,
  onlyFirstArg,
  optsFilter,
  optsDef,
  optsDefWith,
  optsDefs,
  optsDefsWith,
  optsList,
  optsListWith,
  optsLists,
  optsListsWith,
  optsMap,
  pad,
  space,
  spaceWith,
  spaces,
  spacesWith,
  stylePath,
  synopsis,
  synopsisWith,
  synopses,
  synopsesWith,
  table,
  tableWith,
  text,
  textWith,
  texts,
  textsWith,
  usage,
  usageMap
}