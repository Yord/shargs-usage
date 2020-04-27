const {layout} = require('../../layout/combinators/layout')

const usageMap = f => ({opts = []} = {}) => layout(opts.map(f))

module.exports = {
  usageMap
}