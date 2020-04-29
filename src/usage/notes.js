const {textsWith} = require('../layout/texts')

const notesWith = ({id = 'line'} = {id: 'line'}) => (strings = []) => () => textsWith({id})(strings)

const notes = notesWith()

module.exports = {
  notes,
  notesWith
}