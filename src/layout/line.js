const {defaultStyle} = require('../style')

const lineWith = ({id = 'line'} = {id: 'line'}) => (string = '') => (
  ({[id]: line = defaultStyle.line} = defaultStyle) => {
    const styleObj = line[0] || {padStart: 0, width: 80}
    const {padStart = 0, width = 80} = styleObj

    return ''.padStart(padStart) + string.slice(0, width).padEnd(width) + '\n'
  }
)

const line = lineWith()

module.exports = {
  line,
  lineWith
}