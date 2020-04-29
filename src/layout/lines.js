const {layoutMap} = require('./combinators/layoutMap')
const {lineWith}  = require('./line')

const linesWith = ({id = 'line'} = {id: 'line'}) => layoutMap(lineWith({id}))

const lines = linesWith()

module.exports = {
  lines,
  linesWith
}