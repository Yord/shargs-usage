const {brWith} = require('../layout/br')

const spaceWith = ({id = 'line', num = 1} = {id: 'line', num: 1}) => () => brWith({id, num})

const space = spaceWith()

module.exports = {
  space,
  spaceWith
}