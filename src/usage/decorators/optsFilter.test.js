const {optsFilter, optsList} = require('../..')

const id = opts => opts

test('optsFilter README example works', () => {
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
  
  const res = optsFilter(({opts}) => typeof opts === 'undefined')(optsList)(opts)(style)

  const exp = '-a,                 The answer.         \n' +
              '--answer=<number>                       \n' +
              '--version           Prints version.     \n'

  expect(res).toStrictEqual(exp)
})

test('optsFilter works with all option types', () => {
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

  const res = optsFilter(({key} = {}) => typeof key !== 'undefined')(id)(opts)

  const exp = {opts: opts.opts.slice(5)}

  expect(res).toStrictEqual(exp)
})

test('optsFilter filters opts', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const res = optsFilter(({args}) => args.length > 1)(id)(opts)

  const exp = {opts: opts.opts.slice(0, 2)}

  expect(res).toStrictEqual(exp)
})

test('optsFilter does not filter if predicate is undefined', () => {
  const opts = {
    opts: [
      {key: 'answer', types: ['number'], args: ['-a', '--answer'], desc: 'The answer.'},
      {key: 'help', types: [], args: ['-h', '--help'], desc: 'Prints help.'},
      {key: 'version', opts: [], args: ['--version'], desc: 'Prints version.'}
    ]
  }

  const res = optsFilter()(id)(opts)

  const exp = opts

  expect(res).toStrictEqual(exp)
})

test('optsFilter returns an empty list if opts are empty', () => {
  const opts = {}

  const res = optsFilter(({args}) => args.length > 1)(id)(opts)

  const exp = {opts: []}

  expect(res).toStrictEqual(exp)
})

test('optsFilter returns an empty list if opts are undefined', () => {
  const res = optsFilter(({args}) => args.length > 1)(id)()

  const exp = {opts: []}

  expect(res).toStrictEqual(exp)
})