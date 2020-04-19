const optsFilter = require('./optsFilter')

module.exports = optsFilter(
  ({key, opts}) => typeof key !== 'undefined' && typeof opts === 'undefined'
)