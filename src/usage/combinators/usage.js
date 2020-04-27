const {layout} = require('../../layout/combinators/layout')

const usage = (functions = []) => (opts = {}) => (
  layout(functions.map(f => f(opts)))
)

module.exports = {
  usage
}