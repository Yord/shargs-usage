const {synopsisFrom} = require('./synopsis')
const usage          = require('./combinators/usage')
const usageMap       = require('./combinators/usageMap')
const noCommands     = require('./decorators/noCommands')
const onlyCommands   = require('./decorators/onlyCommands')

function synopsisDeepFrom (id = 'line') {
  return (programName = '') => usage([
    noCommands(synopsisFrom(id)(programName)),
    onlyCommands(
      usageMap(cmd => synopsisDeepFrom(id)(commandName(programName, cmd))(cmd.opts))
    )
  ])
}

const synopsisDeep = synopsisDeepFrom('line')

module.exports = {
  synopsisDeep,
  synopsisDeepFrom
}

function commandName (programName, {key, args}) {
  return programName + (programName ? ' ' : '') + (args[0] ? args[0] : key)
}