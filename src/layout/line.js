const {defaultStyle} = require('../style')

// TODO: cut off string if it surpasses the line's width
const lineFrom = id => (string = '') => (
  ({[id]: line = defaultStyle.line} = defaultStyle) => (
    ''.padStart(line.padStart || 0) + string.padEnd(line.width) + '\n'
  )
)

const line = lineFrom('line')

module.exports = {
  line,
  lineFrom
}