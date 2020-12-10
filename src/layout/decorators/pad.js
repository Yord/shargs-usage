const {stylePath} = require('./stylePath')
const {defaultStyle} = require('../../style')

const pad = (path, spaces = 0) => stylePath(path, padBy(spaces))

module.exports = {
  pad
}

function padBy (spaces) {
  return (obj = defaultStyle.line[0]) => ({
    ...obj,
    padStart: (obj.padStart || defaultStyle.line[0].padStart) + spaces,
    width: obj.width - spaces
  })
}