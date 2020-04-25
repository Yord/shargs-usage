const {style: defaultStyle} = require('../../style')

const layout = (functions = []) => (style = defaultStyle) => (
  functions.map(f => f(style)).join('')
)

module.exports = {
  layout
}