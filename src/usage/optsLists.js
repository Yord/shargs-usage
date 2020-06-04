const {layout}        = require('../layout/combinators/layout')
const {pad}           = require('../layout/decorators/pad')
const {usage}         = require('./combinators/usage')
const {usageMap}      = require('./combinators/usageMap')
const {noSubcommands} = require('./decorators/noSubcommands')
const {onlyCommands}  = require('./decorators/onlyCommands')
const {optsListWith}  = require('./optsList')

function optsListsWith ({id = 'cols'} = {id: 'cols'}) {
  return usage([
    noSubcommands(optsListWith({id})),
    onlyCommands(
      usageMap(cmd => layout([
        optsListWith({id})({opts: [cmd]}),
        pad([id, 0], 4)(optsListsWith({id})(cmd))
      ]))
    )
  ])
}

const optsLists = optsListsWith()

module.exports = {
  optsLists,
  optsListsWith
}