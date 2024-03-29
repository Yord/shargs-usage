const {onlySubcommands, optsList} = require('../..')

const id = opts => opts

test('onlySubcommands README example works', () => {
  const style = {
    cols: [{width: 10, padEnd: 2}, {width: 28}]
  }
  
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }
  
  const res = onlySubcommands(optsList)(opts)(style)

  const exp = '-h, --help  Prints help.                \n'

  expect(res).toStrictEqual(exp)
})

test('onlySubcommands works with all option types', () => {
  const opts = {
    opts: [
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
  }

  const res = onlySubcommands(id)(opts)

  const exp = {opts: opts.opts.slice(11, 12)}

  expect(res).toStrictEqual(exp)
})

test('onlySubcommands filters one opt', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const res = onlySubcommands(id)(opts)

  const exp = {opts: opts.opts.slice(2, 3)}

  expect(res).toStrictEqual(exp)
})

test('onlySubcommands filters more than one opt', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const res = onlySubcommands(id)(opts)

  const exp = {opts: opts.opts.slice(1, 3)}

  expect(res).toStrictEqual(exp)
})

test('onlySubcommands returns an empty list if opts are empty', () => {
  const opts = {}

  const res = onlySubcommands(id)(opts)

  const exp = {opts: []}

  expect(res).toStrictEqual(exp)
})

test('onlySubcommands returns an empty list if opts are undefined', () => {
  const res = onlySubcommands(id)()

  const exp = {opts: []}

  expect(res).toStrictEqual(exp)
})