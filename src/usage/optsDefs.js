const {layout}       = require('../layout/combinators/layout')
const {pad}          = require('../layout/decorators/pad')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsDefWith}  = require('./optsDef')

function optsDefsWith ({id = 'line', num = 4} = {id: 'line', num: 4}) {
  return usage([
    noCommands(optsDefWith({id, num})),
    onlyCommands(
      usageMap(cmd => layout([
        optsDefWith({id, num})({opts: [cmd]}),
        pad([id, 0], 4)(
          optsDefsWith({id, num})(cmd)
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