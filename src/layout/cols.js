const {defaultStyle} = require('../style')
const {line} = require('./line')

// TODO: make sure cols are long enough for all elements or have default cols available
// TODO: cut strings if they are too long for a column!
const colsFrom = id => (columns = []) => (
  (style = defaultStyle) => {
    const {[id]: cols = defaultStyle.cols} = style
    const length = columns.reduce((max, column) => Math.max(max, column.length), 0)

    const strings = []
    const styles  = []

    for (let i = 0; i < length; i++) {
      let string = ''
      let style2 = {}

      for (let j = 0; j < columns.length; j++) {
        const text = columns[j][i] || ''

        const width    = (cols[j] || {}).width
        const padStart = (cols[j] || {}).padStart || 0
        const padEnd   = (cols[j] || {}).padEnd   || 0

        style2         = {line: [{padEnd, padStart, width}]}

        string += ''.padStart(padStart) + text.padEnd(width) + ''.padEnd(padEnd)
      }

      strings.push(string)
      styles.push(style2)
    }

    return strings.map((string, i) => line(string)(styles[i])).join('')
  }
)

const cols = colsFrom('cols')

module.exports = {
  cols,
  colsFrom
}