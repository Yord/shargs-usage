const {layout} = require('./combinators/layout')
const {brWith} = require('./br')

const brsWith = ({id = 'line'} = {id: 'line'}) => (length = 1) => layout(
  Array.from({length}, () => brWith({id}))
)

const brs = brsWith()

module.exports = {
  brs,
  brsWith
}