const {layout} = require('../../layout/combinators/layout')

const usage = (functions = []) => (opt = {}) => (
  layout(functions.map(f => f(opt)))
)

module.exports = {
  usage
}