const {textWith} = require('../layout/text')

const noteWith = ({id = 'line'} = {id: 'line'}) => (string = '') => () => textWith({id})(string)

const note = noteWith()

module.exports = {
  note,
  noteWith
}