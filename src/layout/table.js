const {defaultStyle} = require('../style')
const {colsWith}     = require('./cols')

const tableWith = ({id = 'cols'} = {id: 'cols'}) => (rows = []) => (
  (style = defaultStyle) => {
    const {[id]: COLS = defaultStyle.cols} = style

    const colWidths = COLS.map(col => col.width)
    const indexes   = COLS.map((_, i) => i)
    let columns     = indexes.map(() => [])

    for (let i = 0; i < rows.length; i++) {
      const items = rows[i]

      const wordsList = items.map(splitWords)

      let ks   = indexes.map(() => 0)
      let ROWS = indexes.map(() => '')

      while (indexes.reduce((bool, index) => bool || ks[index] < (wordsList[index] || []).length, false)) {
        const words = indexes.map(index => ((wordsList[index] || [])[ks[index]] || '').slice(0, colWidths[index]))

        const fulls = indexes.map(index =>
          ks[index] >= (wordsList[index] || []).length || (ROWS[index] + words[index]).length > colWidths[index]
        )

        if (fulls.reduce((bool, p) => bool && p, true)) {
          columns = indexes.map(index => [...columns[index], ROWS[index]])
          ROWS    = indexes.map(index => words[index] !== ' ' ? words[index] : '')
          ks      = indexes.map(index => ks[index] + 1)
        }

        indexes.forEach(index => {
          if (!fulls[index]) {
            ROWS[index] = ROWS[index] + words[index]
            ks[index]   = ks[index] + 1
          }
        })
      }

      columns = indexes.map(index => [...columns[index], ROWS[index]])
    }

    return colsWith({id})(columns)(style)
  }
)

const table = tableWith()

function splitWords (string) {
  return string.split(/(\s+)/g)
}

module.exports = {
  table,
  tableWith
}