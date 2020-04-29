const {layoutMap} = require('./combinators/layoutMap')
const {textWith}  = require('./text')

const textsWith = ({id = 'line'} = {id: 'line'}) => layoutMap(textWith({id}))

const texts = textsWith()

module.exports = {
  texts,
  textsWith
}