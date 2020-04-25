const {optsF}    = require('./combinators/optsF')
const {defsFrom} = require('../layout/defs')

const optsDefFrom = (id1, id2) => optsF(
  (defArgs, descOpts, opts) => defsFrom(id1, id2)(
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

const optsDef = optsDefFrom('line', 'desc')

module.exports = {
  optsDef,
  optsDefFrom
}

function flatMap (f) {
  return arr => arr.reduce((acc, val) => [...acc, ...f(val)], [])
}