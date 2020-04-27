const {synopsisFrom} = require('./synopsis')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')

function synopsesFrom (id) {
  return (opts = {}) => {
    const {key} = opts

    return usage([
      noCommands(opts => synopsisFrom(id)(withKey(key, opts))),
      onlyCommands(
        usageMap(cmd => synopsesFrom(id)(withKey(key, cmd)))
      )
    ])(opts)
  }
}

const synopses = synopsesFrom('line')

module.exports = {
  synopses,
  synopsesFrom
}

function withKey (key, cmd) {
  return {
    ...cmd,
    key: (key ? key : '') + (key && cmd.key ? ' ' : '') + (cmd.key ? cmd.key : '')
  }
}