const {defaultStyle} = require('../style')
const {linesWith}    = require('./lines')

const textWith = ({id = 'line'} = {id: 'line'}) => (string = '') => (
  (style = defaultStyle) => {
    const {[id]: line = defaultStyle.line} = style
    const width = line[0] && line[0].width

    const words = splitWords(string)

    const strings = []
    let string2    = ''

    for (let i = 0; i < words.length; i++) {
      const word = words[i]

      const lineFull = (string2 + word).length > width
      
      if (lineFull) {
        strings.push(string2)
        string2 = word === ' ' ? '' : word
      } else {
        string2 += word
      }
    }

    strings.push(string2)

    return linesWith({id})(strings)(style)
  }
)

const text = textWith()

function splitWords (string) {
  return string.split(/(\s+)/g)
}

module.exports = {
  text,
  textWith
}