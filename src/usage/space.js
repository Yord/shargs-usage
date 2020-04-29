const {brWith} = require('../layout/br')

const spaceWith = ({id = 'line', lines = 1} = {id: 'line', lines: 1}) => () => brWith({id, lines})

const space = spaceWith()

module.exports = {
  space,
  spaceWith
}