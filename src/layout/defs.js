const layout     = require('./combinators/layout')
const layoutMap  = require('./combinators/layoutMap')

const {textFrom} = require('./text')

const defsFrom = (id1, id2) => layoutMap(
  ([title, desc] = []) => layout([
    textFrom(id1)(title),
    textFrom(id2)(desc)
  ])
)

const defs = defsFrom('line', 'desc')

module.exports = {
  defs,
  defsFrom
}