const {noCommands, optsList} = require('../..')

const id = opts => opts

test('noCommands README example works', () => {
  const style = {
    cols: [{width: 18, padEnd: 2}, {width: 20}]
  }
  
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }
  
  const res = noCommands(optsList)(opts)(style)

  const exp = '-a,                 The answer.         \n' +
              '--answer=<number>                       \n' +
              '--version           Prints version.     \n'

  expect(res).toStrictEqual(exp)
})

test('noCommands works with all option types', () => {
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

  const res = noCommands(id)(opts)

  const exp = {opts: [...opts.opts.slice(5, 11), ...opts.opts.slice(12)]}

  expect(res).toStrictEqual(exp)
})

test('noCommands filters one opt', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const res = noCommands(id)(opts)

  const exp = {opts: opts.opts.slice(0, 2)}

  expect(res).toStrictEqual(exp)
})

test('noCommands filters more than one opt', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const res = noCommands(id)(opts)

  const exp = {opts: opts.opts.slice(0, 1)}

  expect(res).toStrictEqual(exp)
})

test('noCommands returns an empty list if opts are empty', () => {
  const opts = {}

  const res = noCommands(id)(opts)

  const exp = {opts: []}

  expect(res).toStrictEqual(exp)
})

test('noCommands returns an empty list if opts are undefined', () => {
  const res = noCommands(id)()

  const exp = {opts: []}

  expect(res).toStrictEqual(exp)
})