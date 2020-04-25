const {decorate}   = require('../../combinators/decorate')
const {optsFilter} = require('./optsFilter')
const {optsMap}    = require('./optsMap')

const onlyFirstArg = decorate(
  optsMap(opt => ({...opt, args: opt.args.slice(0, 1)})),
  optsFilter(({key, args} = {}) => typeof key !== 'undefined' && Array.isArray(args))
)

module.exports = {
  onlyFirstArg
}