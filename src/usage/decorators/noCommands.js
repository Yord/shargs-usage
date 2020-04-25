const {optsFilter} = require('./optsFilter')

const noCommands = optsFilter(
  ({key, opts} = {}) => typeof key !== 'undefined' && typeof opts === 'undefined'
)

module.exports = {
  noCommands
}