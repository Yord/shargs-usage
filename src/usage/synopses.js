const {synopsisFrom} = require('./synopsis')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')

function synopsesFrom (id) {
  return (programName = '') => usage([
    noCommands(synopsisFrom(id)(programName)),
    onlyCommands(
      usageMap(cmd => synopsesFrom(id)(commandName(programName, cmd))(cmd))
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