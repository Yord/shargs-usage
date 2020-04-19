const layout         = require('../layout/combinators/layout')
const {synopsisFrom} = require('./synopsis')

function synopsisDeepFrom (id) {
  return (programName = '') => (opts = []) => {
    const options  = opts.filter(opt => !isCommand(opt))
    const commands = opts.filter(isCommand)

    return layout([
      synopsisFrom(id)(programName)(options),
      ...commands.map(opt => synopsisDeepFrom(id)(commandName(programName, opt))(opt.opts))
    ])
  }
}

const synopsisDeep = synopsisDeepFrom('line')

module.exports = {
  synopsisDeep,
  synopsisDeepFrom
}

function commandName (programName, {key, args}) {
  return programName + (programName ? ' ' : '') + (args[0] ? args[0] : key)
}

function isCommand ({key, args, types, opts} = {}) {
  return (
    typeof key !== 'undefined' &&
    Array.isArray(args) &&
    typeof types === 'undefined' &&
    Array.isArray(opts)
  )
}