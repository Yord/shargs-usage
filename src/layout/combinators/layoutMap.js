const {layout} = require('./layout')

const layoutMap = f => (list = []) => layout(list.map(f))

module.exports = {
  layoutMap
}