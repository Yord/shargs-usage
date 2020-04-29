const {optsF}    = require('./combinators/optsF')
const {defsWith} = require('../layout/defs')

const optsDefWith = ({id1 = 'line', id2 = 'desc'} = {id1: 'line', id2: 'desc'}) => optsF(
  (defArgs, descOpts, opts) => defsWith({id1, id2})(
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