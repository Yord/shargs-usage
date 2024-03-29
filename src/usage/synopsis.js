const {defaultStyle} = require('../style')
const {tableWith}    = require('../layout/table')

const synopsisWith = ({id = 'line'} = {id: 'line'}) => (opt = {}) => {
  const {key = '', opts = []} = opt
  
  const argsString = buildArgsString(opts)

  return (style = defaultStyle) => {
    const line        = style[id] || defaultStyle.line
    const width       = line[0] && line[0].width
    const startWidth  = Math.min(key.length, width)
    const startPadEnd = startWidth === width || startWidth === 0 ? 0 : 1
    const startSum    = startWidth + startPadEnd
    const argsWidth   = width - startSum <= 0 ? 0 : width - startSum

    const style2 = {
      ...style,
      synopsis: [
        {width: startWidth, padEnd: startPadEnd},
        {width: argsWidth}
      ]
    }

    return tableWith({id: 'synopsis'})([
      [key.slice(0, startWidth), argsString]
    ])(style2)
  }
}

const synopsis = synopsisWith()

module.exports = {
  synopsis,
  synopsisWith
}

function buildArgsString (opts) {
  const optsByKey = opts.reduce(
    (acc, opt = {}) => ({
      ...acc,
      ...(typeof opt.key === 'undefined' ? {} : {[opt.key]: [...(acc[opt.key] || []), opt]})
    }),
    {}
  )

  const argsGroups = opts.reduce(
    ({done, res}, arg = {}) => {
      const {key} = arg
      if (typeof key === 'undefined' || done[key]) return {done, res}
      else {
        const groups = optsByKey[key].reduce(
          (acc, opt) => ({
            ...acc,
            ...(isOption(opt)
                ? isRequired(opt)
                  ? {required: [...acc.required, opt.args]}
                  : {optional: [...acc.optional, ...opt.args]}
                : isRequired(opt)
                  ? {required: [...acc.required, [formatPosArg(opt)]]}
                  : {optional: [...acc.optional, formatPosArg(opt)]}
            )
          }),
          {optional: [], required: []}
        )

        const joinedGroups = [
          ...(groups.optional.length === 0 ? [] : [formatOptional(groups.optional)]),
          ...groups.required.map(formatRequired)
        ]

        return {
          done: {...done, [key]: true},
          res: [...res, joinedGroups.join(' ')]
        }
      }
    },
    {done: {}, res: []}
  )

  return argsGroups.res.join(' ')
}

function isRequired ({required}) {
  return required === true
}

function isOption ({args}) {
  return Array.isArray(args)
}

function formatPosArg ({key, descArg, types}) {
  return '<' + (descArg ? descArg : key) + '>' + (typeof types === 'undefined' ? '...' : '')
}

function formatOptional (args) {
  return '[' + args.join('|') + ']'
}

function formatRequired (args) {
  return '(' + args.join('|') + ')'
}