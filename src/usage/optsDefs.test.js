const {optsDefs, optsDefsWith} = require('..')

test('optsDefs README example works as expected', () => {
  const askOpts = [
    {key: 'help', args: ['-h'], types: [], desc: 'Show the usage docs.'},
    {key: 'questions', required: true, desc: 'Ask questions.'}
  ]

  const opts = {
    opts: [
      {key: 'ask', args: ['ask'], opts: askOpts, desc: 'Ask questions.', required: true},
      {key: 'answer', args: ['-a', '--ans'], types: ['number'], desc: 'The answer.'},
      {key: 'help', args: ['-h', '--help'], types: [], desc: 'Show the usage docs.'}
    ]
  }

  const style = {
    line: [{width: 30}]
  }

  const res = optsDefs(opts)(style)

  const txt = '-a, --ans=<number>            \n' +
              '    The answer.               \n' +
              '-h, --help                    \n' +
              '    Show the usage docs.      \n' +
              'ask [required]                \n' +
              '    Ask questions.            \n' +
              '    -h                        \n' +
              '        Show the usage docs.  \n' +
              '    <questions>... [required] \n' +
              '        Ask questions.        \n'
  
  expect(res).toStrictEqual(txt)
})

test('optsDefs works with all option types', () => {
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

  const opts = {
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts, desc: 'With-opts command.'},
      ...commandOpts
    ]
  }

  const style = {
    line: [{width: 40}]
  }

  const res = optsDefs(opts)(style)

  const txt = '<stringPos>                             \n' +
              '    String positional argument.         \n' +
              '<numberPos>                             \n' +
              '    Number positional argument.         \n' +
              '<boolPos>                               \n' +
              '    Bool positional argument.           \n' +
              '<arrayPos>                              \n' +
              '    Array positional argument.          \n' +
              '<variadicPos>...                        \n' +
              '    Variadic positional argument.       \n' +
              '-v, --variadic                          \n' +
              '    Variadic option.                    \n' +
              '-f, --flag                              \n' +
              '    Flag option.                        \n' +
              '-s, --string=<string>                   \n' +
              '    String option.                      \n' +
              '-n, --number=<number>                   \n' +
              '    Number option.                      \n' +
              '-b, --bool=<bool>                       \n' +
              '    Bool option.                        \n' +
              '-a, --array=<str num>                   \n' +
              '    Array option.                       \n' +
              'with-opts                               \n' +
              '    With-opts command.                  \n' +
              '    <stringPos>                         \n' +
              '        String positional argument.     \n' +
              '    <numberPos>                         \n' +
              '        Number positional argument.     \n' +
              '    <boolPos>                           \n' +
              '        Bool positional argument.       \n' +
              '    <arrayPos>                          \n' +
              '        Array positional argument.      \n' +
              '    <variadicPos>...                    \n' +
              '        Variadic positional argument.   \n' +
              '    -v, --variadic                      \n' +
              '        Variadic option.                \n' +
              '    -f, --flag                          \n' +
              '        Flag option.                    \n' +
              '    -s, --string=<string>               \n' +
              '        String option.                  \n' +
              '    -n, --number=<number>               \n' +
              '        Number option.                  \n' +
              '    -b, --bool=<bool>                   \n' +
              '        Bool option.                    \n' +
              '    -a, --array=<str num>               \n' +
              '        Array option.                   \n' +
              '    command                             \n' +
              '        Command option.                 \n' +
              '        <variadicPos>...                \n' +
              '            Variadic.                   \n' +
              'command                                 \n' +
              '    Command option.                     \n' +
              '    <variadicPos>...                    \n' +
              '        Variadic.                       \n'

  expect(res).toStrictEqual(txt)
})

test('optsDefs prints an empty string if opts are empty', () => {
  const opts = {}

  const style = {
    line: [{width: 40}]
  }
  
  const res = optsDefs(opts)(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsDefs prints an empty string if opts are undefined', () => {
  const style = {
    line: [{width: 40}]
  }
  
  const res = optsDefs()(style)

  const txt = ''

  expect(res).toStrictEqual(txt)
})

test('optsDefs uses default styles if style is undefined', () => {
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

  const opts = {
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts, desc: 'With-opts command.'},
      ...commandOpts
    ]
  }

  const res = optsDefs(opts)()

  const txt = '<stringPos>                                                                     \n' +
              '    String positional argument.                                                 \n' +
              '<numberPos>                                                                     \n' +
              '    Number positional argument.                                                 \n' +
              '<boolPos>                                                                       \n' +
              '    Bool positional argument.                                                   \n' +
              '<arrayPos>                                                                      \n' +
              '    Array positional argument.                                                  \n' +
              '<variadicPos>...                                                                \n' +
              '    Variadic positional argument.                                               \n' +
              '-v, --variadic                                                                  \n' +
              '    Variadic option.                                                            \n' +
              '-f, --flag                                                                      \n' +
              '    Flag option.                                                                \n' +
              '-s, --string=<string>                                                           \n' +
              '    String option.                                                              \n' +
              '-n, --number=<number>                                                           \n' +
              '    Number option.                                                              \n' +
              '-b, --bool=<bool>                                                               \n' +
              '    Bool option.                                                                \n' +
              '-a, --array=<str num>                                                           \n' +
              '    Array option.                                                               \n' +
              'with-opts                                                                       \n' +
              '    With-opts command.                                                          \n' +
              '    <stringPos>                                                                 \n' +
              '        String positional argument.                                             \n' +
              '    <numberPos>                                                                 \n' +
              '        Number positional argument.                                             \n' +
              '    <boolPos>                                                                   \n' +
              '        Bool positional argument.                                               \n' +
              '    <arrayPos>                                                                  \n' +
              '        Array positional argument.                                              \n' +
              '    <variadicPos>...                                                            \n' +
              '        Variadic positional argument.                                           \n' +
              '    -v, --variadic                                                              \n' +
              '        Variadic option.                                                        \n' +
              '    -f, --flag                                                                  \n' +
              '        Flag option.                                                            \n' +
              '    -s, --string=<string>                                                       \n' +
              '        String option.                                                          \n' +
              '    -n, --number=<number>                                                       \n' +
              '        Number option.                                                          \n' +
              '    -b, --bool=<bool>                                                           \n' +
              '        Bool option.                                                            \n' +
              '    -a, --array=<str num>                                                       \n' +
              '        Array option.                                                           \n' +
              '    command                                                                     \n' +
              '        Command option.                                                         \n' +
              '        <variadicPos>...                                                        \n' +
              '            Variadic.                                                           \n' +
              'command                                                                         \n' +
              '    Command option.                                                             \n' +
              '    <variadicPos>...                                                            \n' +
              '        Variadic.                                                               \n'

  expect(res).toStrictEqual(txt)
})

test('optsDefsWith correctly passes on id and padding', () => {
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

  const opts = {
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts, desc: 'With-opts command.'},
      ...commandOpts
    ]
  }

  const style = {
    line2: [{width: 40}]
  }

  const res = optsDefsWith({id: 'line2', pad: 2})(opts)(style)

  const txt = '<stringPos>                             \n' +
              '  String positional argument.           \n' +
              '<numberPos>                             \n' +
              '  Number positional argument.           \n' +
              '<boolPos>                               \n' +
              '  Bool positional argument.             \n' +
              '<arrayPos>                              \n' +
              '  Array positional argument.            \n' +
              '<variadicPos>...                        \n' +
              '  Variadic positional argument.         \n' +
              '-v, --variadic                          \n' +
              '  Variadic option.                      \n' +
              '-f, --flag                              \n' +
              '  Flag option.                          \n' +
              '-s, --string=<string>                   \n' +
              '  String option.                        \n' +
              '-n, --number=<number>                   \n' +
              '  Number option.                        \n' +
              '-b, --bool=<bool>                       \n' +
              '  Bool option.                          \n' +
              '-a, --array=<str num>                   \n' +
              '  Array option.                         \n' +
              'with-opts                               \n' +
              '  With-opts command.                    \n' +
              '    <stringPos>                         \n' +
              '      String positional argument.       \n' +
              '    <numberPos>                         \n' +
              '      Number positional argument.       \n' +
              '    <boolPos>                           \n' +
              '      Bool positional argument.         \n' +
              '    <arrayPos>                          \n' +
              '      Array positional argument.        \n' +
              '    <variadicPos>...                    \n' +
              '      Variadic positional argument.     \n' +
              '    -v, --variadic                      \n' +
              '      Variadic option.                  \n' +
              '    -f, --flag                          \n' +
              '      Flag option.                      \n' +
              '    -s, --string=<string>               \n' +
              '      String option.                    \n' +
              '    -n, --number=<number>               \n' +
              '      Number option.                    \n' +
              '    -b, --bool=<bool>                   \n' +
              '      Bool option.                      \n' +
              '    -a, --array=<str num>               \n' +
              '      Array option.                     \n' +
              '    command                             \n' +
              '      Command option.                   \n' +
              '        <variadicPos>...                \n' +
              '          Variadic.                     \n' +
              'command                                 \n' +
              '  Command option.                       \n' +
              '    <variadicPos>...                    \n' +
              '      Variadic.                         \n'

  expect(res).toStrictEqual(txt)
})

test('optsDefs with wrong id uses default style', () => {
  const id1 = 'test'
  const id2 = 'wrong'

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

  const opts = {
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts, desc: 'With-opts command.'},
      ...commandOpts
    ]
  }

  const style = {
    [id1]: [{width: 40}]
  }

  const res = optsDefsWith({id: id2})(opts)(style)

  const txt = '<stringPos>                                                                     \n' +
              '    String positional argument.                                                 \n' +
              '<numberPos>                                                                     \n' +
              '    Number positional argument.                                                 \n' +
              '<boolPos>                                                                       \n' +
              '    Bool positional argument.                                                   \n' +
              '<arrayPos>                                                                      \n' +
              '    Array positional argument.                                                  \n' +
              '<variadicPos>...                                                                \n' +
              '    Variadic positional argument.                                               \n' +
              '-v, --variadic                                                                  \n' +
              '    Variadic option.                                                            \n' +
              '-f, --flag                                                                      \n' +
              '    Flag option.                                                                \n' +
              '-s, --string=<string>                                                           \n' +
              '    String option.                                                              \n' +
              '-n, --number=<number>                                                           \n' +
              '    Number option.                                                              \n' +
              '-b, --bool=<bool>                                                               \n' +
              '    Bool option.                                                                \n' +
              '-a, --array=<str num>                                                           \n' +
              '    Array option.                                                               \n' +
              'with-opts                                                                       \n' +
              '    With-opts command.                                                          \n' +
              '    <stringPos>                                                                 \n' +
              '        String positional argument.                                             \n' +
              '    <numberPos>                                                                 \n' +
              '        Number positional argument.                                             \n' +
              '    <boolPos>                                                                   \n' +
              '        Bool positional argument.                                               \n' +
              '    <arrayPos>                                                                  \n' +
              '        Array positional argument.                                              \n' +
              '    <variadicPos>...                                                            \n' +
              '        Variadic positional argument.                                           \n' +
              '    -v, --variadic                                                              \n' +
              '        Variadic option.                                                        \n' +
              '    -f, --flag                                                                  \n' +
              '        Flag option.                                                            \n' +
              '    -s, --string=<string>                                                       \n' +
              '        String option.                                                          \n' +
              '    -n, --number=<number>                                                       \n' +
              '        Number option.                                                          \n' +
              '    -b, --bool=<bool>                                                           \n' +
              '        Bool option.                                                            \n' +
              '    -a, --array=<str num>                                                       \n' +
              '        Array option.                                                           \n' +
              '    command                                                                     \n' +
              '        Command option.                                                         \n' +
              '        <variadicPos>...                                                        \n' +
              '            Variadic.                                                           \n' +
              'command                                                                         \n' +
              '    Command option.                                                             \n' +
              '    <variadicPos>...                                                            \n' +
              '        Variadic.                                                               \n'

  expect(res).toStrictEqual(txt)
})

test('optsDefs with undefined id and pad uses default id and pad', () => {
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

  const opts = {
    opts: [
      {key: 'withOpts', args: ['with-opts'], opts: commandOpts, desc: 'With-opts command.'},
      ...commandOpts
    ]
  }

  const style = {
    line: [{width: 40}]
  }

  const res = optsDefsWith({})(opts)(style)

  const txt = '<stringPos>                             \n' +
              '    String positional argument.         \n' +
              '<numberPos>                             \n' +
              '    Number positional argument.         \n' +
              '<boolPos>                               \n' +
              '    Bool positional argument.           \n' +
              '<arrayPos>                              \n' +
              '    Array positional argument.          \n' +
              '<variadicPos>...                        \n' +
              '    Variadic positional argument.       \n' +
              '-v, --variadic                          \n' +
              '    Variadic option.                    \n' +
              '-f, --flag                              \n' +
              '    Flag option.                        \n' +
              '-s, --string=<string>                   \n' +
              '    String option.                      \n' +
              '-n, --number=<number>                   \n' +
              '    Number option.                      \n' +
              '-b, --bool=<bool>                       \n' +
              '    Bool option.                        \n' +
              '-a, --array=<str num>                   \n' +
              '    Array option.                       \n' +
              'with-opts                               \n' +
              '    With-opts command.                  \n' +
              '    <stringPos>                         \n' +
              '        String positional argument.     \n' +
              '    <numberPos>                         \n' +
              '        Number positional argument.     \n' +
              '    <boolPos>                           \n' +
              '        Bool positional argument.       \n' +
              '    <arrayPos>                          \n' +
              '        Array positional argument.      \n' +
              '    <variadicPos>...                    \n' +
              '        Variadic positional argument.   \n' +
              '    -v, --variadic                      \n' +
              '        Variadic option.                \n' +
              '    -f, --flag                          \n' +
              '        Flag option.                    \n' +
              '    -s, --string=<string>               \n' +
              '        String option.                  \n' +
              '    -n, --number=<number>               \n' +
              '        Number option.                  \n' +
              '    -b, --bool=<bool>                   \n' +
              '        Bool option.                    \n' +
              '    -a, --array=<str num>               \n' +
              '        Array option.                   \n' +
              '    command                             \n' +
              '        Command option.                 \n' +
              '        <variadicPos>...                \n' +
              '            Variadic.                   \n' +
              'command                                 \n' +
              '    Command option.                     \n' +
              '    <variadicPos>...                    \n' +
              '        Variadic.                       \n'

  expect(res).toStrictEqual(txt)
})