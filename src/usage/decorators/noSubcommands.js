const {optsFilter} = require('./optsFilter')

const noSubcommands = optsFilter(
  ({key, opts} = {}) => typeof key !== 'undefined' && typeof opts === 'undefined'
)

module.exports = {
  noSubcommands
}