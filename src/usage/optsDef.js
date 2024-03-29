const {optsF}    = require('./combinators/optsF')
const {defsWith} = require('../layout/defs')

const optsDefWith = ({id = 'line', pad = 4} = {id: 'line', pad: 4}) => optsF(
  (defArgs, descOpts, opts) => defsWith({id, pad})(
    flatMap(opt => {
      const {key, desc = ''} = opt
      if (typeof key === 'undefined') return []
      else return [[
        defArgs(opt) + descOpts(opt),
        desc
      ]]
    })(opts)
  )
)

const optsDef = optsDefWith()

module.exports = {
  optsDef,
  optsDefWith
}

function flatMap (f) {
  return arr => arr.reduce((acc, val) => [...acc, ...f(val)], [])
}