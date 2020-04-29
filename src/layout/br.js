const {layout}   = require('./combinators/layout')
const {lineWith} = require('./line')

const brWith = ({id = 'line', num = 1} = {id: 'line', num: 1}) => layout(
  Array.from({length: num}, () => lineWith({id})(''))
)

const br = brWith()

module.exports = {
  br,
  brWith
}