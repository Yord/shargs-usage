const {defaultStyle} = require('../../style')

const stylePath = (path, f) => layoutFunction => (style = defaultStyle) => (
  layoutFunction(applyStylePath(path, f, style))
)

module.exports = {
  stylePath
}

function applyStylePath (path, f, obj) {
  if (!Array.isArray(path)) return obj

  const [prop, ...rest] = path
  if (typeof prop === 'undefined') {
    return f(obj)
  } else if (Array.isArray(obj)) {
    return obj.map((val, index) => index === prop ? applyStylePath(rest, f, val) : val)
  } else {
    return {...obj, [prop]: applyStylePath(rest, f, obj[prop] || {})}
  }
}