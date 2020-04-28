const {synopsisFrom} = require('./synopsis')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {decorate}     = require('../combinators/decorate')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsMap}      = require('./decorators/optsMap')

function synopsesFrom (id) {
  return (opt = {}) => usage([
    noCommands(synopsisFrom(id)),
    decorate(prefixKey(opt.key), onlyCommands)(
      usageMap(synopsesFrom(id))
    )
  ])(opt)
}

const synopses = synopsesFrom('line')

module.exports = {
  synopses,
  synopsesFrom
}

function prefixKey (prefix = '') {
  return optsMap(opt => ({
    ...opt,
    key: prefix + (prefix === '' ? '' : ' ') + (opt.key === '' ? '' : opt.key)
  }))
}