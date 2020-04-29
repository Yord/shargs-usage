const {layout}       = require('../layout/combinators/layout')
const {pad}          = require('../layout/decorators/pad')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsDefWith}  = require('./optsDef')

function optsDefsWith ({id = 'line', padding = 4} = {id: 'line', padding: 4}) {
  return usage([
    noCommands(optsDefWith({id, padding})),
    onlyCommands(
      usageMap(cmd => layout([
        optsDefWith({id, padding})({opts: [cmd]}),
        pad([id, 0], 4)(
          optsDefsWith({id, padding})(cmd)
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