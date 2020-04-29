const {optsF}     = require('./combinators/optsF')
const {tableWith} = require('../layout/table')

const optsListWith = ({id = 'cols'} = {id: 'cols'}) => optsF(
  (defArgs, descOpt, opts) => tableWith({id})(
    flatMap(opt => {
      const {key, desc = ''} = opt
      if (typeof key === 'undefined') return []
      else return [[
        defArgs(opt),
        desc + descOpt(opt)
      ]]
    })(opts)
  )
)

const optsList = optsListWith()

module.exports = {
  optsList,
  optsListWith
}

function flatMap (f) {
  return arr => arr.reduce((acc, val) => [...acc, ...f(val)], [])
}