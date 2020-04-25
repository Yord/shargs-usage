const {stylePath} = require('./stylePath')

const pad = (path, spaces = 0) => stylePath(path, padBy(spaces))

module.exports = {
  pad
}

function padBy (spaces) {
  return obj => ({
    ...obj,
    padStart: (obj.padStart || 0) + spaces,
    width: obj.width - spaces
  })
}