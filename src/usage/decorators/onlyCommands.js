const optsFilter = require('./optsFilter')

module.exports = optsFilter(
  ({key, args, types, opts}) => (
    typeof key !== 'undefined' &&
    Array.isArray(args) &&
    typeof types === 'undefined' &&
    Array.isArray(opts)
  )
)