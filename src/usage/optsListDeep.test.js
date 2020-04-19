const {optsListDeep, optsListDeepFrom} = require('..')

test('optsListDeep README example works as expected', () => {
  const askOpts = [
    {key: 'help', args: ['-h'], types: [], desc: 'Show the usage docs.'},
    {key: 'questions', required: true, desc: 'Ask questions.'}
  ]

  const opts = [
    {key: 'ask', args: ['ask'], opts: askOpts, desc: 'Ask questions.', required: true},
    {key: 'answer', args: ['-a', '--ans'], types: ['number'], desc: 'The answer.'},
    {key: 'help', args: ['-h', '--help'], types: [], desc: 'Show the usage docs.'}
  ]

  const style = {
    cols: [{width: 20}, {width: 25}]
  }

  const res = optsListDeep(opts)(style)

  const txt = '-a, --ans=<number>  The answer.              \n' +
              '-h, --help          Show the usage docs.     \n' +
              'ask                 Ask questions. [required]\n' +
              '    -h              Show the usage docs.     \n' +
              '    <questions>...  Ask questions. [required]\n'
  
  expect(res).toStrictEqual(txt)
})

test('optsListDeep works with all option types', () => {
  const varOpts = [
    {key: 'variadicPos', desc: 'Variadic.' },
  ]

  const commandOpts = [
    undefined,
    {foo: 'bar'                                                                                                                                          },
    {                    args: ['-w', '--wrong']                                                                                                         },
    {                                                types: ['wrong']                                                                                    },
    {                                                                           opts: []                                                                 },
    {key: 'stringPos',                               types: ['string'],                         desc: 'String positional argument.'                      },
    {key: 'numberPos',                               types: ['number'],                         desc: 'Number positional argument.'                      },
    {key: 'boolPos',                                 types: ['bool'],                           desc: 'Bool positional argument.'                        },
    {key: 'arrayPos',                                types: ['bool', 'bool'],                   desc: 'Array positional argument.'                       },
    {key: 'variadicPos',                                                                        desc: 'Variadic positional argument.'                    },
    {key: 'command',     args: ['command'],                                      opts: varOpts, desc: 'Command option.'                                  },
    {key: 'variadic',    args: ['-v', '--variadic'],                                            desc: 'Variadic option.'                                 },
    {key: 'flag',        args: ['-f', '--flag'],     types: [],                                 desc: 'Flag option.'                                     },
    {key: 'string',      args: ['-s', '--string'],   types: ['string'],                         desc: 'String option.'                                   },
    {key: 'number',      args: ['-n', '--number'],   types: ['number'],                         desc: 'Number option.'                                   },
    {key: 'bool',        args: ['-b', '--bool'],     types: ['bool'],                           desc: 'Bool option.'                                     },
    {key: 'array',       args: ['-a', '--array'],    types: ['string', 'number'],               desc: 'Array option.',                 descArg: 'str num'}
  ]

  const opts = [
    {key: 'withOpts', args: ['with-opts'], opts: commandOpts, desc: 'With-opts command.'},
    ...commandOpts
  ]

  const style = {
    cols: [{width: 35}, {width: 30}]
  }

  const res = optsListDeep(opts)(style)

  const txt = '<stringPos>                        String positional argument.   \n' +
              '<numberPos>                        Number positional argument.   \n' +
              '<boolPos>                          Bool positional argument.     \n' +
              '<arrayPos>                         Array positional argument.    \n' +
              '<variadicPos>...                   Variadic positional argument. \n' +
              '-v, --variadic                     Variadic option.              \n' +
              '-f, --flag                         Flag option.                  \n' +
              '-s, --string=<string>              String option.                \n' +
              '-n, --number=<number>              Number option.                \n' +
              '-b, --bool=<bool>                  Bool option.                  \n' +
              '-a, --array=<str num>              Array option.                 \n' +
              'with-opts                          With-opts command.            \n' +
              '    <stringPos>                    String positional argument.   \n' +
              '    <numberPos>                    Number positional argument.   \n' +
              '    <boolPos>                      Bool positional argument.     \n' +
              '    <arrayPos>                     Array positional argument.    \n' +
              '    <variadicPos>...               Variadic positional argument. \n' +
              '    -v, --variadic                 Variadic option.              \n' +
              '    -f, --flag                     Flag option.                  \n' +
              '    -s, --string=<string>          String option.                \n' +
              '    -n, --number=<number>          Number option.                \n' +
              '    -b, --bool=<bool>              Bool option.                  \n' +
              '    -a, --array=<str num>          Array option.                 \n' +
              '    command                        Command option.               \n' +
              '        <variadicPos>...           Variadic.                     \n' +
              'command                            Command option.               \n' +
              '    <variadicPos>...               Variadic.                     \n'

  expect(res).toStrictEqual(txt)
})

test('optsListDeep prints an empty string if opts are empty', () => {
  const opts = []

  const style = {
    cols: [{width: 35}, {width: 30}]
  }
  
  const res = optsListDeep(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsListDeep prints an empty string if opts are undefined', () => {
  const style = {
    cols: [{width: 35}, {width: 30}]
  }
  
  const res = optsListDeep()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsListDeep uses default style if style is undefined', () => {
  const varOpts = [
    {key: 'variadicPos', desc: 'Variadic.' },
  ]

  const commandOpts = [
    undefined,
    {foo: 'bar'                                                                                                                                          },
    {                    args: ['-w', '--wrong']                                                                                                         },
    {                                                types: ['wrong']                                                                                    },
    {                                                                           opts: []                                                                 },
    {key: 'stringPos',                               types: ['string'],                         desc: 'String positional argument.'                      },
    {key: 'numberPos',                               types: ['number'],                         desc: 'Number positional argument.'                      },
    {key: 'boolPos',                                 types: ['bool'],                           desc: 'Bool positional argument.'                        },
    {key: 'arrayPos',                                types: ['bool', 'bool'],                   desc: 'Array positional argument.'                       },
    {key: 'variadicPos',                                                                        desc: 'Variadic positional argument.'                    },
    {key: 'command',     args: ['command'],                                      opts: varOpts, desc: 'Command option.'                                  },
    {key: 'variadic',    args: ['-v', '--variadic'],                                            desc: 'Variadic option.'                                 },
    {key: 'flag',        args: ['-f', '--flag'],     types: [],                                 desc: 'Flag option.'                                     },
    {key: 'string',      args: ['-s', '--string'],   types: ['string'],                         desc: 'String option.'                                   },
    {key: 'number',      args: ['-n', '--number'],   types: ['number'],                         desc: 'Number option.'                                   },
    {key: 'bool',        args: ['-b', '--bool'],     types: ['bool'],                           desc: 'Bool option.'                                     },
    {key: 'array',       args: ['-a', '--array'],    types: ['string', 'number'],               desc: 'Array option.',                 descArg: 'str num'}
  ]

  const opts = [
    {key: 'withOpts', args: ['with-opts'], opts: commandOpts, desc: 'With-opts command.'},
    ...commandOpts
  ]

  const res = optsListDeep(opts)()

  const txt = '<stringPos>              String positional argument.                            \n' +
              '<numberPos>              Number positional argument.                            \n' +
              '<boolPos>                Bool positional argument.                              \n' +
              '<arrayPos>               Array positional argument.                             \n' +
              '<variadicPos>...         Variadic positional argument.                          \n' +
              '-v, --variadic           Variadic option.                                       \n' +
              '-f, --flag               Flag option.                                           \n' +
              '-s, --string=<string>    String option.                                         \n' +
              '-n, --number=<number>    Number option.                                         \n' +
              '-b, --bool=<bool>        Bool option.                                           \n' +
              '-a, --array=<str num>    Array option.                                          \n' +
              'with-opts                With-opts command.                                     \n' +
              '    <stringPos>          String positional argument.                            \n' +
              '    <numberPos>          Number positional argument.                            \n' +
              '    <boolPos>            Bool positional argument.                              \n' +
              '    <arrayPos>           Array positional argument.                             \n' +
              '    <variadicPos>...     Variadic positional argument.                          \n' +
              '    -v, --variadic       Variadic option.                                       \n' +
              '    -f, --flag           Flag option.                                           \n' +
              '    -s, --string=<string>String option.                                         \n' +
              '    -n, --number=<number>Number option.                                         \n' +
              '    -b, --bool=<bool>    Bool option.                                           \n' +
              '    -a, --array=<str num>Array option.                                          \n' +
              '    command              Command option.                                        \n' +
              '        <variadicPos>... Variadic.                                              \n' +
              'command                  Command option.                                        \n' +
              '    <variadicPos>...     Variadic.                                              \n'

  expect(res).toStrictEqual(txt)
})

test('optsListDeepFrom correctly passes on id', () => {
  const varOpts = [
    {key: 'variadicPos', desc: 'Variadic.' },
  ]

  const commandOpts = [
    undefined,
    {foo: 'bar'                                                                                                                                          },
    {                    args: ['-w', '--wrong']                                                                                                         },
    {                                                types: ['wrong']                                                                                    },
    {                                                                           opts: []                                                                 },
    {key: 'stringPos',                               types: ['string'],                         desc: 'String positional argument.'                      },
    {key: 'numberPos',                               types: ['number'],                         desc: 'Number positional argument.'                      },
    {key: 'boolPos',                                 types: ['bool'],                           desc: 'Bool positional argument.'                        },
    {key: 'arrayPos',                                types: ['bool', 'bool'],                   desc: 'Array positional argument.'                       },
    {key: 'variadicPos',                                                                        desc: 'Variadic positional argument.'                    },
    {key: 'command',     args: ['command'],                                      opts: varOpts, desc: 'Command option.'                                  },
    {key: 'variadic',    args: ['-v', '--variadic'],                                            desc: 'Variadic option.'                                 },
    {key: 'flag',        args: ['-f', '--flag'],     types: [],                                 desc: 'Flag option.'                                     },
    {key: 'string',      args: ['-s', '--string'],   types: ['string'],                         desc: 'String option.'                                   },
    {key: 'number',      args: ['-n', '--number'],   types: ['number'],                         desc: 'Number option.'                                   },
    {key: 'bool',        args: ['-b', '--bool'],     types: ['bool'],                           desc: 'Bool option.'                                     },
    {key: 'array',       args: ['-a', '--array'],    types: ['string', 'number'],               desc: 'Array option.',                 descArg: 'str num'}
  ]

  const opts = [
    {key: 'withOpts', args: ['with-opts'], opts: commandOpts, desc: 'With-opts command.'},
    ...commandOpts
  ]

  const style = {
    foo: [{width: 35}, {width: 30}]
  }

  const res = optsListDeepFrom('foo')(opts)(style)

  const txt = '<stringPos>                        String positional argument.   \n' +
              '<numberPos>                        Number positional argument.   \n' +
              '<boolPos>                          Bool positional argument.     \n' +
              '<arrayPos>                         Array positional argument.    \n' +
              '<variadicPos>...                   Variadic positional argument. \n' +
              '-v, --variadic                     Variadic option.              \n' +
              '-f, --flag                         Flag option.                  \n' +
              '-s, --string=<string>              String option.                \n' +
              '-n, --number=<number>              Number option.                \n' +
              '-b, --bool=<bool>                  Bool option.                  \n' +
              '-a, --array=<str num>              Array option.                 \n' +
              'with-opts                          With-opts command.            \n' +
              '    <stringPos>                    String positional argument.   \n' +
              '    <numberPos>                    Number positional argument.   \n' +
              '    <boolPos>                      Bool positional argument.     \n' +
              '    <arrayPos>                     Array positional argument.    \n' +
              '    <variadicPos>...               Variadic positional argument. \n' +
              '    -v, --variadic                 Variadic option.              \n' +
              '    -f, --flag                     Flag option.                  \n' +
              '    -s, --string=<string>          String option.                \n' +
              '    -n, --number=<number>          Number option.                \n' +
              '    -b, --bool=<bool>              Bool option.                  \n' +
              '    -a, --array=<str num>          Array option.                 \n' +
              '    command                        Command option.               \n' +
              '        <variadicPos>...           Variadic.                     \n' +
              'command                            Command option.               \n' +
              '    <variadicPos>...               Variadic.                     \n'

  expect(res).toStrictEqual(txt)
})