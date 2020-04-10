module.exports = f => (opts = []) => {
  const opts2 = opts.filter(opt => typeof opt === 'object')

  const argsByKey = opts2.reduce(
    (acc, opt) => ({
      ...acc,
      ...(typeof opt === 'undefined' || typeof opt.key === 'undefined'
          ? {}
          : {[opt.key]: [...(acc[opt.key] || []), ...(opt.args || [])]}
      )
    }),
    {}
  )

  return f(
    opt => Array.isArray(opt.args) ? listArgs(opt) : posArg(opt),
    descOpt(argsByKey),
    opts2
  )
}

function posArg ({key, variadic = false}) {
  return '<' + key + '>' + (variadic === true ? '...' : '')
}

function listArgs (opt) {
  const {singleDash, others, doubleDash} = sortArgs(opt.args)
  const commaList = [...singleDash, ...others, ...doubleDash].join(', ')
  return commaList + valuesLabel(opt, doubleDash.length > 0)
}

function valuesLabel ({descArg = '', types, only = []}, equalsSign) {
  const value = (
    Array.isArray(only) && only.length > 0        ? only.join('|') :
    typeof descArg === 'string' && descArg !== '' ? descArg :
    Array.isArray(types)                          ?
    types.length === 1                            ? types[0] :
    types.length > 1                              ? types.join(' ')
                                                  : ''
                                                  : ''
  )

  return value === '' ? '' : (equalsSign ? '=' : ' ') + '<' + value + '>'
}

function descOpt (argsByKey) {
  return ({contradicts = [], defaultValues = [], implies = [], required}) => {
    const labels = [
      ...(Array.isArray(contradicts) && contradicts.length > 0
          ? ['contradicts: ' + flatMap(_ => argsByKey[_])(contradicts).join(', ')]
          : []
      ),
      ...(!Array.isArray(defaultValues)
          ? []
          : defaultValues.length === 0
            ? []
            : defaultValues.length === 1
              ? ['default: ' + defaultValues[0]]
              : ['default: ' + defaultValues.join(', ')]
      ),
      ...(Array.isArray(implies) && implies.length > 0
          ? ['implies: ' + flatMap(_ => argsByKey[_])(implies).join(', ')]
          : []
      ),
      ...(required === true
          ? ['required']
          : required === false
            ? ['not required']
            : []
      )
    ]
  
    return (labels.length === 0 ? '' : ' ') + labels.map(label => '[' + label + ']').join(' ')
  }
}

function sortArgs (args) {
  const singleDash = []
  const doubleDash = []
  const others     = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--'))     doubleDash.push(arg)
    else if (arg.startsWith('-')) singleDash.push(arg)
    else                          others.push(arg)
  }

  return {singleDash, others, doubleDash}
}

function flatMap (f) {
  return arr => arr.reduce((acc, val) => [...acc, ...f(val)], [])
}