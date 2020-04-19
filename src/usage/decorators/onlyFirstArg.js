const decorate   = require('../decorators/combinators/decorate')
const optsFilter = require('./optsFilter')
const optsMap    = require('./optsMap')

module.exports = decorate(
  optsMap(opt => ({...opt, args: opt.args.slice(0, 1)})),
  optsFilter(({key, args} = {}) => typeof key !== 'undefined' && Array.isArray(args))
)