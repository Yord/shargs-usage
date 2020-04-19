const {justArgs, optsList} = require('../..')

const id = opts => opts

test('justArgs README example works', () => {
  const style = {
    cols: [{width: 18, padEnd: 2}, {width: 20}]
  }
  
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]
  
  const res = justArgs(['-a', '-h'])(optsList)(opts)(style)

  const exp = '-a,                 The answer.         \n' +
              '--answer=<number>                       \n' +
              '-h, --help          Prints help.        \n'

  expect(res).toStrictEqual(exp)
})

test('justArgs works with all option types', () => {
  const opts = [
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

  const res = justArgs(['--variadic', 'command'])(id)(opts)

  expect(res).toStrictEqual(opts.slice(9, 11))
})

test('justArgs filters more than one opt', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = justArgs(['-a', '-h'])(id)(opts)

  expect(res).toStrictEqual(opts.slice(0, 2))
})

test('justArgs filters exactly one opt', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = justArgs(['--version'])(id)(opts)

  expect(res).toStrictEqual(opts.slice(2, 3))
})

test('justArgs filters all opts', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = justArgs(['-a', '-h', '--version'])(id)(opts)

  expect(res).toStrictEqual(opts)
})

test('justArgs filters no opt if no opt has elements', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = justArgs(['--foo'])(id)(opts)

  expect(res).toStrictEqual([])
})

test('justArgs filters no opt if list is empty', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = justArgs([])(id)(opts)

  expect(res).toStrictEqual([])
})

test('justArgs filters no opt if list is undefined', () => {
  const opts = [
    {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
    {key: 'help', opts: [], args: ['-h', '--help'], desc: 'Prints help.'},
    {key: 'version', types: [], args: ['--version'], desc: 'Prints version.'}
  ]

  const res = justArgs()(id)(opts)

  expect(res).toStrictEqual([])
})

test('justArgs returns an empty list if opts are empty', () => {
  const opts = []

  const res = justArgs(['-h'])(id)(opts)

  expect(res).toStrictEqual([])
})

test('justArgs returns an empty list if opts are undefined', () => {
  const res = justArgs(['-h'])(id)()

  expect(res).toStrictEqual([])
})