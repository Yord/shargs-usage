const {brsWith} = require('../layout/brs')

const spacesWith = ({id = 'line'} = {id: 'line'}) => (length = 1) => () => brsWith({id})(length)

const spaces = spacesWith()

module.exports = {
  spaces,
  spacesWith
}