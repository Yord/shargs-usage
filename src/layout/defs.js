const {layout}    = require('./combinators/layout')
const {layoutMap} = require('./combinators/layoutMap')
const {textWith}  = require('./text')

const defsWith = ({id1 = 'line', id2 = 'desc'} = {id1: 'line', id2: 'desc'}) => layoutMap(
  (pair = []) => layout([
    textWith({id: id1})(pair[0]),
    textWith({id: id2})(pair[1])
  ])
)

const defs = defsWith()

module.exports = {
  defs,
  defsWith
}