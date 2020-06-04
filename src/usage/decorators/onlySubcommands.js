const {optsFilter} = require('./optsFilter')

const onlySubcommands = optsFilter(
  ({key, args, types, opts} = {}) => (
    typeof key !== 'undefined' &&
    Array.isArray(args) &&
    typeof types === 'undefined' &&
    Array.isArray(opts)
  )
)

module.exports = {
  onlySubcommands
}