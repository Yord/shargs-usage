const layout         = require('../layout/combinators/layout')
const pad            = require('../layout/decorators/pad')
const usage          = require('./combinators/usage')
const usageMap       = require('./combinators/usageMap')
const noCommands     = require('./decorators/noCommands')
const onlyCommands   = require('./decorators/onlyCommands')
const {optsDefsFrom} = require('./optsDefs')

function optsDefsDeepFrom (id1 = 'line', id2 = 'desc') {
  return usage([
    noCommands(optsDefsFrom(id1, id2)),
    onlyCommands(
      usageMap(cmd => layout([
        optsDefsFrom(id1, id2)([cmd]),
        pad([id1], 4)(
          pad([id2], 4)(
            optsDefsDeepFrom(id1, id2)(cmd.opts)
          )
        )
      ]))
    )
  ])
}

const optsDefsDeep = optsDefsDeepFrom('line', 'desc')

module.exports = {
  optsDefsDeep,
  optsDefsDeepFrom
}