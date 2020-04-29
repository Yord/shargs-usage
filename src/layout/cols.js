const {defaultStyle} = require('../style')
const {line} = require('./line')

const colsWith = ({id = 'cols'} = {id: 'cols'}) => (columns = []) => (
  (style = defaultStyle) => {
    const {[id]: cols = defaultStyle.cols} = style
    const length = columns.reduce((max, column) => Math.max(max, column.length), 0)

    const strings = []
    const styles  = []

    for (let i = 0; i < length; i++) {
      let string = ''

      for (let j = 0; j < columns.length; j++) {
        const text = columns[j][i] || ''

        const width    = (cols[j] || {}).width
        const padStart = (cols[j] || {}).padStart || 0
        const padEnd   = (cols[j] || {}).padEnd   || 0

        string += ''.padStart(padStart) + text.slice(0, width).padEnd(width) + ''.padEnd(padEnd)
      }

      strings.push(string)
      styles.push({line: [{padEnd: 0, padStart: 0, width: string.length}]})
    }

    return strings.map((string, i) => line(string)(styles[i])).join('')
  }
)

const cols = colsWith()

module.exports = {
  cols,
  colsWith
}