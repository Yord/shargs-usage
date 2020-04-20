const {br, brFrom}                     = require('./layout/br')
const {brs, brsFrom}                   = require('./layout/brs')
const {cols, colsFrom}                 = require('./layout/cols')
const decorate                         = require('./combinators/decorate')
const {defs, defsFrom}                 = require('./layout/defs')
const justArgs                         = require('./usage/decorators/justArgs')
const layout                           = require('./layout/combinators/layout')
const layoutMap                        = require('./layout/combinators/layoutMap')
const {line, lineFrom}                 = require('./layout/line')
const {lines, linesFrom}               = require('./layout/lines')
const noCommands                       = require('./usage/decorators/noCommands')
const {note, noteFrom}                 = require('./usage/note')
const {notes, notesFrom}               = require('./usage/notes')
const onlyCommands                     = require('./usage/decorators/onlyCommands')
const onlyFirstArg                     = require('./usage/decorators/onlyFirstArg')
const optsFilter                       = require('./usage/decorators/optsFilter')
const {optsDefs, optsDefsFrom}         = require('./usage/optsDefs')
const {optsDefsDeep, optsDefsDeepFrom} = require('./usage/optsDefsDeep')
const {optsList, optsListFrom}         = require('./usage/optsList')
const {optsListDeep, optsListDeepFrom} = require('./usage/optsListDeep')
const optsMap                          = require('./usage/decorators/optsMap')
const pad                              = require('./layout/decorators/pad')
const {space, spaceFrom}               = require('./usage/space')
const {spaces, spacesFrom}             = require('./usage/spaces')
const stylePath                        = require('./layout/decorators/stylePath')
const {synopsis, synopsisFrom}         = require('./usage/synopsis')
const {synopsisDeep, synopsisDeepFrom} = require('./usage/synopsisDeep')
const {table, tableFrom}               = require('./layout/table')
const {text, textFrom}                 = require('./layout/text')
const {texts, textsFrom}               = require('./layout/texts')
const usage                            = require('./usage/combinators/usage')
const usageMap                         = require('./usage/combinators/usageMap')

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
  optsDefs,
  optsDefsFrom,
  optsDefsDeep,
  optsDefsDeepFrom,
  optsList,
  optsListFrom,
  optsListDeep,
  optsListDeepFrom,
  optsMap,
  pad,
  space,
  spaceFrom,
  spaces,
  spacesFrom,
  stylePath,
  synopsis,
  synopsisFrom,
  synopsisDeep,
  synopsisDeepFrom,
  table,
  tableFrom,
  text,
  textFrom,
  texts,
  textsFrom,
  usage,
  usageMap
}