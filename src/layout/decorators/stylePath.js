const {defaultStyle} = require('../../style')

const stylePath = (path, f) => layoutFunction => (style = defaultStyle) => (
  layoutFunction(applyStylePath(path, f, style))
)

module.exports = {
  stylePath
}

function applyStylePath (path, f, style) {
  if (!Array.isArray(path)) return style

  const [prop, ...rest] = path
  if (typeof prop === 'undefined') {
    return f(style)
  } else if (Array.isArray(style)) {
    return style.map((val, index) => index === prop ? f(val) : val)
  } else {
    return {...style, [prop]: applyStylePath(rest, f, style[prop] || {})}
  }
}