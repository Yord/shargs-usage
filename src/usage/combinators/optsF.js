const optsF = f => ({opts = []} = {opts: []}) => {
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

module.exports = {
  optsF
}

function posArg ({key, descArg, types}) {
  return '<' + (descArg ? descArg : key) + '>' + (typeof types === 'undefined' ? '...' : '')
}

function listArgs (opt) {
  const {singleDash, others, doubleDash} = sortArgs(opt.args)
  const commaList = [...singleDash, ...others, ...doubleDash].join(', ')
  return commaList + valuesLabel(opt, doubleDash.length > 0)
}

function valuesLabel ({descArg, types, only = []}, equalsSign) {
  const value = (
    typeof descArg === 'string'            ? descArg :
    Array.isArray(only) && only.length > 0 ? only.join('|') :
    Array.isArray(types)                   ?
    types.length === 1                     ? types[0] :
    types.length > 1                       ? types.join(' ')
                                           : ''
                                           : ''
  )

  if (value === '') return ''

  return (equalsSign ? '=' : ' ') + '<' + value + '>'
}

function descOpt (argsByKey) {
  const contradictsLabel = ({contradicts}) => {
    if (Array.isArray(contradicts) && contradicts.length > 0) {
      return ['contradicts: ' + flatMap(_ => argsByKey[_])(contradicts).join(', ')]
    }
    return []
  }

  const defaultLabel = ({descDefault, defaultValues}) => {
    if (descDefault === '') return []
    if (typeof descDefault === 'string') return ['default: ' + descDefault]
    if (!Array.isArray(defaultValues)) return []
    if (defaultValues.length === 0) return []
    if (defaultValues.length === 1) {
      const value = defaultValues[0]

      if (['string', 'number', 'boolean'].indexOf(typeof value) !== -1) {
        return ['default: ' + value]
      }
      return []
    }
    return ['default: [' + defaultValues.join(', ') + ']']
  }

  const impliesLabel = ({implies}) => {
    if (Array.isArray(implies) && implies.length > 0) {
      return ['implies: ' + flatMap(_ => argsByKey[_])(implies).join(', ')]
    }
    return []
  }

  const requiredLabel = ({required}) => {
    if (required === true) return ['required']
    if (required === false) return ['not required']
    return []
  }

  return ({contradicts = [], defaultValues = [], descDefault, implies = [], required}) => {
    const labels = [
      ...contradictsLabel({contradicts}),
      ...defaultLabel({descDefault, defaultValues}),
      ...impliesLabel({implies}),
      ...requiredLabel({required})
    ]

    const prefix = labels.length === 0 ? '' : ' '

    return prefix + labels.map(label => '[' + label + ']').join(' ')
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