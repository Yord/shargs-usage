const {textWith} = require('../layout/text')

const descWith = ({id = 'line'} = {id: 'line'}) => ({desc}) => textWith({id})(desc)

const desc = descWith()

module.exports = {
  desc,
  descWith
}