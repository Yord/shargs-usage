const layout = require('./layout')

module.exports = f => (list = []) => layout(list.map(f))