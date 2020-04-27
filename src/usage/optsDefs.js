const {layout}       = require('../layout/combinators/layout')
const {pad}          = require('../layout/decorators/pad')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsDefFrom}  = require('./optsDef')

function optsDefsFrom (id1, id2) {
  return usage([
    noCommands(optsDefFrom(id1, id2)),
    onlyCommands(
      usageMap(cmd => layout([
        optsDefFrom(id1, id2)({opts: [cmd]}),
        pad([id1, 0], 4)(
          pad([id2, 0], 4)(
            optsDefsFrom(id1, id2)(cmd)
          )
        )
      ]))
    )
  ])
}

const optsDefs = optsDefsFrom('line', 'desc')

module.exports = {
  optsDefs,
  optsDefsFrom
}