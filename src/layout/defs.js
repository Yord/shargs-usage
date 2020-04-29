const {layout}    = require('./combinators/layout')
const {layoutMap} = require('./combinators/layoutMap')
const {textWith}  = require('./text')
const {pad}       = require('./decorators/pad')

const defsWith = ({id = 'line', num = 4} = {id: 'line', num: 4}) => layoutMap(
  (pair = []) => layout([
    textWith({id})(pair[0]),
    pad([id, 0], num)(textWith({id})(pair[1]))
  ])
)

const defs = defsWith()

module.exports = {
  defs,
  defsWith
}