const {layout}   = require('./combinators/layout')
const {lineWith} = require('./line')

const brWith = ({id = 'line', lines = 1} = {id: 'line', lines: 1}) => layout(
  Array.from({length: lines}, () => lineWith({id})(''))
)

const br = brWith()

module.exports = {
  br,
  brWith
}