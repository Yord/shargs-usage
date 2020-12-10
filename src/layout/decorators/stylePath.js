const {defaultStyle} = require('../../style')

const stylePath = (path, f) => layoutFunction => (style = defaultStyle) => {
  if (!Array.isArray(path)) return style
  return layoutFunction(applyStylePath(path, f, style))
}

module.exports = {
  stylePath
}

function applyStylePath (path, f, obj) {
  const [prop, ...rest] = path
  if (typeof prop === 'undefined') {
    return f(obj)
  } else if (Array.isArray(obj)) {
    return obj.map((val, index) => index === prop ? applyStylePath(rest, f, val) : val)
  } else if (typeof obj === 'undefined') {
    if (typeof prop === 'number') {
      return Array.from({length: prop + 1}, (value, index) => index === prop ? applyStylePath(rest, f, undefined) : value)
    } else {
      return {[prop]: applyStylePath(rest, f, undefined)}
    }
  } else {
    return {...obj, [prop]: applyStylePath(rest, f, obj[prop])}
  }
}