const {brWith} = require('../layout/br')

const spaceWith = ({id = 'line'} = {id: 'line'}) => () => brWith({id})

const space = spaceWith()

module.exports = {
  space,
  spaceWith
}