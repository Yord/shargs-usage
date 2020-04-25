const {layout}    = require('./combinators/layout')
const {layoutMap} = require('./combinators/layoutMap')
const {textFrom}  = require('./text')

const defsFrom = (id1, id2) => layoutMap(
  (pair = []) => layout([
    textFrom(id1)(pair[0]),
    textFrom(id2)(pair[1])
  ])
)

const defs = defsFrom('line', 'desc')

module.exports = {
  defs,
  defsFrom
}