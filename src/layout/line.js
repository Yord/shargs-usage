const {defaultStyle} = require('../style')

// TODO: cut off string if it surpasses the line's width
const lineFrom = id => (string = '') => (
  ({[id]: line = defaultStyle.line} = defaultStyle) => (
    ''.padStart(line[0] && line[0].padStart || 0) + string.padEnd(line[0] && line[0].width) + '\n'
  )
)

const line = lineFrom('line')

module.exports = {
  line,
  lineFrom
}