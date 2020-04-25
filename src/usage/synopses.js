const {synopsisFrom} = require('./synopsis')
const {usage}        = require('./combinators/usage')
const {layoutMap}    = require('../layout/combinators/layoutMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')

function synopsesFrom (id = 'line') {
  return (programName = '') => usage([
    noCommands(synopsisFrom(id)(programName)),
    onlyCommands(
      layoutMap(cmd => synopsesFrom(id)(commandName(programName, cmd))(cmd.opts))
    )
  ])
}

const synopses = synopsesFrom('line')

module.exports = {
  synopses,
  synopsesFrom
}

function commandName (programName, cmd) {
  const {key, args} = cmd
  return programName + (programName ? ' ' : '') + (args[0] ? args[0] : key)
}