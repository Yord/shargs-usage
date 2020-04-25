const {optsList, optsMap} = require('../..')

const id = opts => opts

test('optsMap README example works', () => {
  const style = {
    cols: [{width: 18, padEnd: 2}, {width: 20}]
  }
  
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]
  
  const res = optsMap(opt => ({...opt, args: opt.args.slice(0, 1)}))(optsList)(opts)(style)

  const exp = '-a <number>         The answer.         \n' +
              '-h                  Prints help.        \n' +
              '--version           Prints version.     \n'

  expect(res).toStrictEqual(exp)
})

test('optsMap works with all option types', () => {
  const opts = [
    undefined,
    {foo: 'bar'                                                                          },
    {                    args: ['-w', '--wrong']                                         },
    {                                                types: ['wrong']                    },
    {                                                                           opts: [] },
    {key: 'variadicPos'                                                                  },
    {key: 'stringPos',                               types: ['string']                   },
    {key: 'numberPos',                               types: ['number']                   },
    {key: 'boolPos',                                 types: ['bool']                     },
    {key: 'arrayPos',                                types: ['bool', 'bool']             },
    {key: 'variadic',    args: ['-v', '--variadic']                                      },
    {key: 'command',     args: ['co', 'command'],                                opts: []},
    {key: 'flag',        args: ['-f', '--flag'],     types: []                           },
    {key: 'string',      args: ['-s', '--string'],   types: ['string']                   },
    {key: 'number',      args: ['-n', '--number'],   types: ['number']                   },
    {key: 'bool',        args: ['-b', '--bool'],     types: ['bool']                     },
    {key: 'array',       args: ['-a', '--array'],    types: ['string', 'number']         }
  ]

  const res = optsMap(({key} = {}) => key)(id)(opts)

  const exp = [undefined, ...opts.slice(1).map(({key}) => key)]

  expect(res).toStrictEqual(exp)
})

test('optsMap transforms opts', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = optsMap(
    opt => ({...opt, args: opt.args.length > 0 ? opt.args.slice(0, 1) : []})
  )(id)(opts)

  const exp = [
    {key: 'answer', types: ['number'], args: ['-a'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h'], desc: 'Prints help.'},
    {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
  ]

  expect(res).toStrictEqual(exp)
})

test('optsMap does not transforms if function is undefined', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = optsMap()(id)(opts)

  const exp = opts

  expect(res).toStrictEqual(exp)
})

test('optsMap returns an empty list if opts are empty', () => {
  const opts = []

  const res = optsMap(
    opt => ({...opt, args: opt.args.length > 0 ? opt.args.slice(0, 1) : []})
  )(id)(opts)

  expect(res).toStrictEqual([])
})

test('optsMap returns an empty list if opts are undefined', () => {
  const res = optsMap(
    opt => ({...opt, args: opt.args.length > 0 ? opt.args.slice(0, 1) : []})
  )(id)()

  expect(res).toStrictEqual([])
})