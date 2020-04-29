const {lineWith} = require('./line')

const brWith = ({id = 'line'} = {id: 'line'}) => lineWith({id})('')

const br = brWith()

module.exports = {
  br,
  brWith
}