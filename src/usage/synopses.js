const {synopsisFrom} = require('./synopsis')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')

function synopsesFrom (id) {
  return (opts = {}) => {
    const {descArg = ''} = opts

    return usage([
      noCommands(opts => synopsisFrom(id)(withDescArg(descArg, opts))),
      onlyCommands(
        usageMap(cmd => synopsesFrom(id)({...cmd, descArg: commandName(descArg, cmd)}))
      )
    ])(opts)
  }
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

function withDescArg (descArg, opts) {
  return {
    ...opts,
    descArg: descArg + (descArg && opts.descArg ? ' ' : '') + (opts.descArg || '')
  }
}