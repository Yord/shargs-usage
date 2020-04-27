const {layout}       = require('../layout/combinators/layout')
const {pad}          = require('../layout/decorators/pad')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsListFrom} = require('./optsList')

function optsListsFrom (id) {
  return usage([
    noCommands(optsListFrom(id)),
    onlyCommands(
      usageMap(cmd => layout([
        optsListFrom(id)({opts: [cmd]}),
        pad([id, 0], 4)(optsListsFrom(id)(cmd))
      ]))
    )
  ])
}

const optsLists = optsListsFrom('cols')

module.exports = {
  optsLists,
  optsListsFrom
}