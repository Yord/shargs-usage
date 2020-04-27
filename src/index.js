const {br, brFrom}               = require('./layout/br')
const {brs, brsFrom}             = require('./layout/brs')
const {cols, colsFrom}           = require('./layout/cols')
const {decorate}                 = require('./combinators/decorate')
const {defs, defsFrom}           = require('./layout/defs')
const {desc, descFrom}           = require('./usage/desc')
const {justArgs}                 = require('./usage/decorators/justArgs')
const {layout}                   = require('./layout/combinators/layout')
const {layoutMap}                = require('./layout/combinators/layoutMap')
const {line, lineFrom}           = require('./layout/line')
const {lines, linesFrom}         = require('./layout/lines')
const {noCommands}               = require('./usage/decorators/noCommands')
const {note, noteFrom}           = require('./usage/note')
const {notes, notesFrom}         = require('./usage/notes')
const {onlyCommands}             = require('./usage/decorators/onlyCommands')
const {onlyFirstArg}             = require('./usage/decorators/onlyFirstArg')
const {optsFilter}               = require('./usage/decorators/optsFilter')
const {optsDef, optsDefFrom}     = require('./usage/optsDef')
const {optsDefs, optsDefsFrom}   = require('./usage/optsDefs')
const {optsList, optsListFrom}   = require('./usage/optsList')
const {optsLists, optsListsFrom} = require('./usage/optsLists')
const {optsMap}                  = require('./usage/decorators/optsMap')
const {pad}                      = require('./layout/decorators/pad')
const {space, spaceFrom}         = require('./usage/space')
const {spaces, spacesFrom}       = require('./usage/spaces')
const {stylePath}                = require('./layout/decorators/stylePath')
const {synopses, synopsesFrom}   = require('./usage/synopses')
const {synopsis, synopsisFrom}   = require('./usage/synopsis')
const {table, tableFrom}         = require('./layout/table')
const {text, textFrom}           = require('./layout/text')
const {texts, textsFrom}         = require('./layout/texts')
const {usage}                    = require('./usage/combinators/usage')
const {usageMap}                 = require('./usage/combinators/usageMap')

module.exports = {
  br,
  brFrom,
  brs,
  brsFrom,
  cols,
  colsFrom,
  decorate,
  defs,
  defsFrom,
  desc,
  descFrom,
  justArgs,
  layout,
  layoutMap,
  line,
  lineFrom,
  lines,
  linesFrom,
  noCommands,
  note,
  noteFrom,
  notes,
  notesFrom,
  onlyCommands,
  onlyFirstArg,
  optsFilter,
  optsDef,
  optsDefFrom,
  optsDefs,
  optsDefsFrom,
  optsList,
  optsListFrom,
  optsLists,
  optsListsFrom,
  optsMap,
  pad,
  space,
  spaceFrom,
  spaces,
  spacesFrom,
  stylePath,
  synopsis,
  synopsisFrom,
  synopses,
  synopsesFrom,
  table,
  tableFrom,
  text,
  textFrom,
  texts,
  textsFrom,
  usage,
  usageMap
}