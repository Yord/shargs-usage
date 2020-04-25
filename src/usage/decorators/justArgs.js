const {optsFilter} = require('./optsFilter')

const justArgs = (list = []) => optsFilter(
  ({args = []} = {}) => list.some(arg => args.includes(arg))
)

module.exports = {
  justArgs
}