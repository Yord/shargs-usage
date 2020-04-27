const {textFrom} = require('../layout/text')

const descFrom = id => ({desc}) => textFrom(id)(desc)

const desc = descFrom('line')

module.exports = {
  desc,
  descFrom
}