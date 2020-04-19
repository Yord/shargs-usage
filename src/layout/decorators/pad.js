const stylePath = require('./stylePath')

module.exports = (path, spaces = 0) => stylePath(path, pad(spaces))

function pad (spaces) {
  return obj => ({
    ...obj,
    padStart: (obj.padStart || 0) + spaces,
    width: obj.width - spaces
  })
}