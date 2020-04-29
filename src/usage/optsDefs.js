const {layout}       = require('../layout/combinators/layout')
const {pad}          = require('../layout/decorators/pad')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsDefWith}  = require('./optsDef')

function optsDefsWith ({id1 = 'line', id2 = 'desc'} = {id1: 'line', id2: 'desc'}) {
  return usage([
    noCommands(optsDefWith({id1, id2})),
    onlyCommands(
      usageMap(cmd => layout([
        optsDefWith({id1, id2})({opts: [cmd]}),
        pad([id1, 0], 4)(
          pad([id2, 0], 4)(
            optsDefsWith({id1, id2})(cmd)
          )
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