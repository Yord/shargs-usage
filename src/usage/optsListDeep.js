const layout         = require('../layout/combinators/layout')
const pad            = require('../layout/decorators/pad')
const usage          = require('./combinators/usage')
const usageMap       = require('./combinators/usageMap')
const noCommands     = require('./decorators/noCommands')
const onlyCommands   = require('./decorators/onlyCommands')
const {optsListFrom} = require('./optsList')

function optsListDeepFrom (id = 'cols') {
  return usage([
    noCommands(optsListFrom(id)),
    onlyCommands(
      usageMap(cmd => layout([
        optsListFrom(id)([cmd]),
        pad([id, 0], 4)(optsListDeepFrom(id)(cmd.opts))
      ]))
    )
  ])
}

const optsListDeep = optsListDeepFrom('cols')

module.exports = {
  optsListDeep,
  optsListDeepFrom
}