const {layout}       = require('../layout/combinators/layout')
const {layoutMap}    = require('../layout/combinators/layoutMap')
const {pad}          = require('../layout/decorators/pad')
const {usage}        = require('./combinators/usage')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsDefFrom}  = require('./optsDef')

function optsDefsFrom (id1, id2) {
  return usage([
    noCommands(optsDefFrom(id1, id2)),
    onlyCommands(
      layoutMap(cmd => layout([
        optsDefFrom(id1, id2)([cmd]),
        pad([id1, 0], 4)(
          pad([id2, 0], 4)(
            optsDefsFrom(id1, id2)(cmd.opts)
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