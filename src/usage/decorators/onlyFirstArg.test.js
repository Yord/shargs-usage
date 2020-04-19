const {onlyFirstArg, optsList} = require('../..')

const id = opts => opts

test('onlyFirstArg README example works', () => {
  const style = {
    cols: [{width: 18, padEnd: 2}, {width: 20}]
  }
  
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]
  
  const res = onlyFirstArg(optsList)(opts)(style)

  const exp = '-a <number>         The answer.         \n' +
              '-h                  Prints help.        \n' +
              '--version           Prints version.     \n'

  expect(res).toStrictEqual(exp)
})

test('onlyFirstArg works with all option types', () => {
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

  const res = onlyFirstArg(id)(opts)

  const exp = opts.slice(10).map(opt => ({...opt, args: opt.args.slice(0, 1)}))

  expect(res).toStrictEqual(exp)
})

test('onlyFirstArg filters one opt', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = onlyFirstArg(id)(opts)

  const exp = [
    {key: 'answer', types: ['number'], args: ['-a'], desc: 'The answer.'},
    {key: 'help', types: [], args: ['-h'], desc: 'Prints help.'},
    {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
  ]

  expect(res).toStrictEqual(exp)
})

test('onlyFirstArg returns an empty list if opts are empty', () => {
  const opts = []

  const res = onlyFirstArg(id)(opts)

  expect(res).toStrictEqual([])
})

test('onlyFirstArg returns an empty list if opts are undefined', () => {
  const res = onlyFirstArg(id)()

  expect(res).toStrictEqual([])
})