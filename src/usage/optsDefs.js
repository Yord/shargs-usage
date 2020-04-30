const {layout}       = require('../layout/combinators/layout')
const {pad}          = require('../layout/decorators/pad')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsDefWith}  = require('./optsDef')

function optsDefsWith ({id = 'line', pad: padding = 4} = {id: 'line', pad: 4}) {
  return usage([
    noCommands(optsDefWith({id, pad: padding})),
    onlyCommands(
      usageMap(cmd => layout([
        optsDefWith({id, pad: padding})({opts: [cmd]}),
        pad([id, 0], 4)(
          optsDefsWith({id, pad: padding})(cmd)
        )
      ]))
    )
  ])
}

const optsDefs = optsDefsWith()

module.exports = {
  optsDefs,
  optsDefsWith
}