const defaultStyle = require('../../style')

module.exports = (path, f) => layoutFunction => (style = defaultStyle) => (
  layoutFunction(stylePath(path, f, style))
)

function stylePath (path, f, style) {
  if (!Array.isArray(path)) return style

  const [prop, ...rest] = path
  if (typeof prop === 'undefined') {
    return f(style)
  } else if (Array.isArray(style)) {
    return style.map((val, index) => index === prop ? f(val) : val)
  } else {
    return {...style, [prop]: stylePath(rest, f, style[prop] || {})}
  }
}