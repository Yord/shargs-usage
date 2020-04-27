const {layout} = require('../../layout/combinators/layout')

const usageMap = (f = opt => style => '') => ({opts = []} = {}) => layout(opts.map(f))

module.exports = {
  usageMap
}