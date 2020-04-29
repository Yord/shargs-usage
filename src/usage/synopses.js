const {synopsisWith} = require('./synopsis')
const {usage}        = require('./combinators/usage')
const {usageMap}     = require('./combinators/usageMap')
const {decorate}     = require('../combinators/decorate')
const {noCommands}   = require('./decorators/noCommands')
const {onlyCommands} = require('./decorators/onlyCommands')
const {optsMap}      = require('./decorators/optsMap')

function synopsesWith ({id = 'line'} = {id: 'line'}) {
  return (opt = {}) => usage([
    noCommands(synopsisWith({id})),
    decorate(prefixKey(opt.key), onlyCommands)(
      usageMap(synopsesWith({id}))
    )
  ])(opt)
}

const synopses = synopsesWith()

module.exports = {
  synopses,
  synopsesWith
}

function prefixKey (prefix = '') {
  return optsMap(opt => ({
    ...opt,
    key: prefix + (prefix === '' ? '' : ' ') + (opt.key === '' ? '' : opt.key)
  }))
}