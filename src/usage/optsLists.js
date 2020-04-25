const {layout}       = require('../layout/combinators/layout')
const {layoutMap}    = require('../layout/combinators/layoutMap')
const {pad}          = require('../layout/decorators/pad')
const {usage}        = require('./combinators/usage')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsListFrom} = require('./optsList')

function optsListsFrom (id) {
  return usage([
    noCommands(optsListFrom(id)),
    onlyCommands(
      layoutMap(cmd => layout([
        optsListFrom(id)([cmd]),
        pad([id, 0], 4)(optsListsFrom(id)(cmd.opts))
      ]))
    )
  ])
}

const optsLists = optsListsFrom('cols')

module.exports = {
  optsLists,
  optsListsFrom
}